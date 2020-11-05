import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { CategoryField } from '../../../../services/categories';
import { CategoryForm } from '../../ui/CategoryForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: CategoryField;
  onUpdateCategory: (field: CategoryField) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultCategory,
  onUpdateCategory,
  onCancel,
}) => {
  const formId = 'updateCategoryForm';

  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="updateCategoryDialog"
    >
      <DialogTitle>カテゴリーの編集</DialogTitle>
      <DialogContent>
        <CategoryForm
          id={formId}
          defaultField={defaultCategory}
          onSubmit={onUpdateCategory}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form={formId} data-testid="doneButton">
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