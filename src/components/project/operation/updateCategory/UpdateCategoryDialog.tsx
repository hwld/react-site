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

type UpdateCategoryDialogProps = {
  disabled?: boolean;
  defaultCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const UpdateCategoryDialog: React.FC<UpdateCategoryDialogProps> = ({
  disabled,
  defaultCategoryId,
  size,
}) => {
  const [newCategory, setNewCategory] = useState<Category>(
    getDefaultCategory(),
  );
  const { categories, updateCategory } = useCategoriesContext();

  const update = () => {
    updateCategory(newCategory);
  };

  const setDefaultCategoryName = () => {
    const defaultCategory = categories.find(
      category => category.id === defaultCategoryId,
    );
    if (!defaultCategory) {
      throw Error('存在しないカテゴリー');
    }
    setNewCategory(defaultCategory);
  };

  const changeCategoryField = (
    fieldName: keyof CategoryField,
    value: string,
  ) => {
    setNewCategory(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <OperationDialog
      title="カテゴリーの編集"
      activatorIcon={<EditIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="変更"
      onDone={update}
      doneDisabled={newCategory.categoryName === ''}
      onOpen={setDefaultCategoryName}
      data-testid="updateCategoryDialog"
    >
      <UpdateCategoryDialogContent
        newCategoryField={newCategory}
        onChangeCategoryField={changeCategoryField}
      />
    </OperationDialog>
  );
};

export { UpdateCategoryDialog };
