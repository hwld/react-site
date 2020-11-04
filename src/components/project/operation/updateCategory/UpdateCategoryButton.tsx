import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import {
  Category,
  CategoryField,
  getDefaultCategory,
} from '../../../../services/categories';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { UpdateCategoryDialog } from './UpdateCategoryDialog';

type Props = {
  disabled?: boolean;
  defaultCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, defaultCategoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const [newCategory, setNewCategory] = useState<Category>(
    getDefaultCategory(),
  );
  const { categories, updateCategory } = useCategoriesContext();

  const setDefaultCategory = () => {
    const defaultCategory = categories.find(
      category => category.id === defaultCategoryId,
    );
    if (!defaultCategory) {
      throw Error('存在しないカテゴリー');
    }
    setNewCategory(defaultCategory);
  };

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setDefaultCategory();
    open();
  };

  const handleUpdateCategory = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    updateCategory(newCategory);
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
    setNewCategory(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="カテゴリーの編集"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <EditIcon fontSize={size} />
      </ActivatorButton>
      <UpdateCategoryDialog
        isOpen={isOpen}
        onClose={close}
        newCategory={newCategory}
        onChangeCategoryField={changeCategoryField}
        onUpdateCategory={handleUpdateCategory}
        onCancel={handleCancel}
      />
    </>
  );
};

export const UpdateCategoryButton = Component;
