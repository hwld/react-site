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
  onAddCategory: (field: CategoryField) => void;
};

const Component: React.FC<Props> = ({ isOpen, onClose, onAddCategory }) => {
  const formId = 'addCategoryForm';

  return (
    <OperationDialog open={isOpen} onClose={onClose}>
      <DialogTitle>カテゴリーの追加</DialogTitle>

      <DialogContent>
        <CategoryForm id={formId} onSubmit={onAddCategory} />
      </DialogContent>

      <DialogActions>
        <Button type="submit" form={formId}>
          <Typography color="textSecondary">追加</Typography>
        </Button>
        <Button onClick={onClose}>
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const AddCategoryDialog = Component;
