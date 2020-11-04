import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import AddCategoryIcon from '@material-ui/icons/CreateNewFolder';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import {
  CategoryField,
  getDefaultCategory,
} from '../../../../services/categories';
import { AddCategoryDialogContent } from './AddCategoryDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

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

  const handleDone = (event: React.SyntheticEvent) => {
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
      <OperationDialog
        open={isOpen}
        onClose={close}
        data-testid="addCategoryDialog"
      >
        <DialogTitle>カテゴリーの追加</DialogTitle>
        <AddCategoryDialogContent
          categoryField={categoryField}
          onChange={changeCategoryField}
        />
        <DialogActions>
          <Button
            disabled={categoryField.categoryName.length === 0}
            onClick={handleDone}
            data-testid="doneButton"
          >
            <Typography color="textSecondary">追加</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
    </>
  );
};

export const AddCategoryButton = Component;
