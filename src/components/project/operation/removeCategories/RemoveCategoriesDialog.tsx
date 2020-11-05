import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRemoveCategories: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  onRemoveCategories,
  onCancel,
}) => {
  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="removeCategoryDialog"
    >
      <DialogTitle>カテゴリーの削除</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRemoveCategories} data-testid="doneButton">
          <Typography color="textSecondary">削除</Typography>
        </Button>
        <Button onClick={onCancel} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const RemoveCategoriesDialog = Component;