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
  defaultField?: NoteField;
  onUpdateNote: (field: NoteField) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultField,
  onUpdateNote,
}) => {
  const formId = 'updateNoteForm';

  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="updateNoteDialog"
    >
      <DialogTitle>メモの編集</DialogTitle>
      <DialogContent>
        <NoteForm
          id={formId}
          defaultField={defaultField}
          onSubmit={onUpdateNote}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form={formId} data-testid="doneButton">
          <Typography color="textSecondary">変更</Typography>
        </Button>
        <Button onClick={onClose} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const UpdateNoteDialog = Component;
