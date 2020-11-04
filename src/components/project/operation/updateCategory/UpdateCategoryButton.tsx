import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import {
  Category,
  CategoryField,
  getDefaultCategory,
} from '../../../../services/categories';
import { UpdateCategoryDialogContent } from './UpdateCategoryDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  disabled?: boolean;
  defaultCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, defaultCategoryId, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>(
    getDefaultCategory(),
  );
  const { categories, updateCategory } = useCategoriesContext();

  const update = () => {
    updateCategory(newCategory);
  };

  const setDefaultCategory = () => {
    const defaultCategory = categories.find(
      category => category.id === defaultCategoryId,
    );
    if (!defaultCategory) {
      throw Error('存在しないカテゴリー');
    }
    setNewCategory(defaultCategory);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDefaultCategory();
    setIsOpen(true);
  };

  const changeCategoryField = (
    fieldName: keyof CategoryField,
    value: string,
  ) => {
    setNewCategory(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <>
      <OperationIconButton
        disabled={disabled}
        tooltipText="カテゴリーの編集"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <EditIcon fontSize={size} />
      </OperationIconButton>
      <OperationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="カテゴリーの編集"
        doneText="変更"
        onDone={update}
        doneDisabled={newCategory.categoryName === ''}
        data-testid="updateCategoryDialog"
      >
        <UpdateCategoryDialogContent
          newCategoryField={newCategory}
          onChangeCategoryField={changeCategoryField}
        />
      </OperationDialog>
    </>
  );
};

export const UpdateCategoryButton = Component;
