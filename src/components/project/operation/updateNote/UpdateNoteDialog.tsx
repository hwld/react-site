import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { NoteField } from '../../../../services/notes';
import { EditNoteFields } from '../../ui/EditNoteFields';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  newNoteField: NoteField;
  onChangeNoteField: (fieldName: keyof NoteField, value: string) => void;
  onUpdateNote: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  newNoteField,
  onChangeNoteField,
  onUpdateNote,
  onCancel,
}) => {
  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="updateNoteDialog"
    >
      <DialogTitle>メモの編集</DialogTitle>
      <DialogContent>
        <EditNoteFields noteField={newNoteField} onChange={onChangeNoteField} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onUpdateNote}
          disabled={newNoteField.text.length === 0}
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

export const UpdateNoteDialog = Component;
