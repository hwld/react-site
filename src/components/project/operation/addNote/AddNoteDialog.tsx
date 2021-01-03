import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { NoteField } from '../../../../services/notes';
import { NoteForm } from '../../ui/NoteForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (field: NoteField) => void;
};

const Component: React.FC<Props> = ({ isOpen, onClose, onAddNote }) => {
  const formId = 'addNoteForm';

  return (
    <OperationDialog open={isOpen} onClose={onClose} maxWidth="md">
      <DialogTitle>メモの追加</DialogTitle>

      <DialogContent>
        <NoteForm id={formId} onSubmit={onAddNote} />
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

export const AddNoteDialog = Component;
