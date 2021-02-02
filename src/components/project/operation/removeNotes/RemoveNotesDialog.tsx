import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRemoveNotesDialog: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  onRemoveNotesDialog,
}) => {
  return (
    <OperationDialog open={isOpen} onClose={onClose}>
      <DialogTitle>メモの削除</DialogTitle>

      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか？
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="削除" onClick={onRemoveNotesDialog} />
      </DialogActions>
    </OperationDialog>
  );
};

export const RemoveNotesDialog = Component;
