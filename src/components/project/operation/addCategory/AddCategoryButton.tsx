import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import AddCategoryIcon from '@material-ui/icons/CreateNewFolder';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import {
  CategoryField,
  getDefaultCategory,
} from '../../../../services/categories';
import { AddCategoryDialogContent } from './AddCategoryDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  disabled?: boolean;
  parentCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, parentCategoryId, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryField, setCategoryField] = useState<CategoryField>(
    getDefaultCategory(),
  );
  const { addCategory } = useCategoriesContext();

  const add = () => {
    addCategory(parentCategoryId, categoryField);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCategoryField({ categoryName: '' });
    setIsOpen(true);
  };

  const changeCategoryField = (
    fieldName: keyof CategoryField,
    value: string,
  ) => {
    setCategoryField(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <OperationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="カテゴリーの追加"
      activator={
        <OperationIconButton
          disabled={disabled}
          tooltipText="カテゴリーの追加"
          onClick={handleClick}
          data-testid="activatorButton"
        >
          <AddCategoryIcon fontSize={size} />
        </OperationIconButton>
      }
      doneText="追加"
      onDone={add}
      doneDisabled={categoryField.categoryName.length === 0}
      data-testid="addCategoryDialog"
    >
      <AddCategoryDialogContent
        categoryField={categoryField}
        onChange={changeCategoryField}
      />
    </OperationDialog>
  );
};

export const AddCategoryButton = Component;
