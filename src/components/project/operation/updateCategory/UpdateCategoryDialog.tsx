import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { CategoryField } from '../../../../services/categories';
import { EditCategoryFields } from '../../ui/EditCategoryFields';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  newCategory: CategoryField;
  onChangeCategoryField: (
    fieldName: keyof CategoryField,
    value: string,
  ) => void;
  onUpdateCategory: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  newCategory,
  onChangeCategoryField,
  onUpdateCategory,
  onCancel,
}) => {
  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="updateCategoryDialog"
    >
      <DialogTitle>カテゴリーの編集</DialogTitle>
      <DialogContent>
        <EditCategoryFields
          categoryField={newCategory}
          onChange={onChangeCategoryField}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onUpdateCategory}
          disabled={newCategory.categoryName === ''}
          data-testid="doneButton"
        >
          <Typography color="textSecondary">変更</Typography>
        </Button>
        <Button onClick={onCancel} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const UpdateCategoryDialog = Component;
