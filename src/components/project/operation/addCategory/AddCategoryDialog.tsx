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
  categoryField: CategoryField;
  onChangeCategoryField: (fieldName: 'categoryName', value: string) => void;
  onAddCategory: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  categoryField,
  onChangeCategoryField,
  onAddCategory,
  onCancel,
}) => {
  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="addCategoryDialog"
    >
      <DialogTitle>カテゴリーの追加</DialogTitle>

      <DialogContent>
        <EditCategoryFields
          categoryField={categoryField}
          onChange={onChangeCategoryField}
        />
      </DialogContent>

      <DialogActions>
        <Button
          disabled={categoryField.categoryName.length === 0}
          onClick={onAddCategory}
          data-testid="doneButton"
        >
          <Typography color="textSecondary">追加</Typography>
        </Button>
        <Button onClick={onCancel} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const AddCategoryDialog = Component;
