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
  onRemoveNotesDialog: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onCancel,
  onClose,
  onRemoveNotesDialog,
}) => {
  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="removeNoteDialog"
    >
      <DialogTitle>メモの削除</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRemoveNotesDialog} data-testid="doneButton">
          <Typography color="textSecondary">削除</Typography>
        </Button>
        <Button onClick={onCancel} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const RemoveNotesDialog = Component;
