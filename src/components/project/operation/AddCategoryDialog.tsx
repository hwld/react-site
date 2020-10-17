import React, { useState } from 'react';
import { SvgIconProps, DialogContent } from '@material-ui/core';
import AddCategoryIcon from '@material-ui/icons/CreateNewFolder';
import { OperationDialog } from './OperationDialog';
import { EditCategoryField } from '../ui/EditCategoryFields';
import { useCategoriesContext } from '../../../context/CategoriesContext';
import {
  CategoryField,
  getDefaultCategory,
} from '../../../services/categories';

type AddCategoryDialogProps = {
  disabled?: boolean;
  parentCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  disabled,
  parentCategoryId,
  size,
}) => {
  const { addCategory } = useCategoriesContext();
  const [categoryField, setCategoryField] = useState<CategoryField>(
    getDefaultCategory(),
  );

  const add = () => {
    addCategory(parentCategoryId, categoryField);
  };

  const clearField = () => {
    setCategoryField({ categoryName: '' });
  };

  const changeCategoryName = (text: string) => {
    setCategoryField({ categoryName: text });
  };

  return (
    <OperationDialog
      title="カテゴリーの追加"
      activatorIcon={<AddCategoryIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="追加"
      onDone={add}
      doneDisabled={categoryField.categoryName.length === 0}
      onOpen={clearField}
      data-testid="addCategoryDialog"
    >
      <DialogContent>
        <EditCategoryField
          category={categoryField}
          onChange={changeCategoryName}
        />
      </DialogContent>
    </OperationDialog>
  );
};

export { AddCategoryDialog };
