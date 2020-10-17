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

  const changeCategoryField = (
    fieldName: keyof CategoryField,
    value: string,
  ) => {
    setCategoryField(state => ({ ...state, [fieldName]: value }));
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
      <AddCategoryDialogContent
        categoryField={categoryField}
        onChange={changeCategoryField}
      />
    </OperationDialog>
  );
};

export { AddCategoryDialog };
