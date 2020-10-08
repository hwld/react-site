import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from './OperationDialog';
import { EditCategoryField } from '../ui/EditCategoryFields';
import { useCategoriesContext } from '../../../context/CategoriesContext';
import { Category, getDefaultCategory } from '../../../services/categories';

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

  const changeCategoryName = (categoryName: string) => {
    setNewCategory(state => ({ ...state, categoryName }));
  };

  return (
    <OperationDialog
      tooltipText="カテゴリーを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="変更"
      onDone={update}
      doneDisabled={newCategory.categoryName === ''}
      onOpen={setDefaultCategoryName}
      data-testid="updateCategoryDialog"
    >
      <DialogTitle>カテゴリーの編集</DialogTitle>
      <DialogContent>
        <EditCategoryField
          category={newCategory}
          onChange={changeCategoryName}
        />
      </DialogContent>
    </OperationDialog>
  );
};

export { UpdateCategoryDialog };
