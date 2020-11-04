import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import AddCategoryIcon from '@material-ui/icons/CreateNewFolder';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import {
  CategoryField,
  getDefaultCategory,
} from '../../../../services/categories';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { AddCategoryDialog } from './AddCategoryDialog';

type Props = {
  disabled?: boolean;
  parentCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, parentCategoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const [categoryField, setCategoryField] = useState<CategoryField>(
    getDefaultCategory(),
  );
  const { addCategory } = useCategoriesContext();

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setCategoryField({ categoryName: '' });
    open();
  };

  const handleAddCategory = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    addCategory(parentCategoryId, categoryField);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  const changeCategoryField = (
    fieldName: keyof CategoryField,
    value: string,
  ) => {
    setCategoryField(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="カテゴリーの追加"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <AddCategoryIcon fontSize={size} />
      </ActivatorButton>

      <AddCategoryDialog
        isOpen={isOpen}
        onClose={close}
        onAddCategory={handleAddCategory}
        onCancel={handleCancel}
        categoryField={categoryField}
        onChangeCategoryField={changeCategoryField}
      />
    </>
  );
};

export const AddCategoryButton = Component;
