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
  noteField: NoteField;
  onChangeNoteField: (fieldName: keyof NoteField, value: string) => void;
  onAddNote: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  noteField,
  onChangeNoteField,
  onAddNote,
  onCancel,
}) => {
  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="addNoteDialog"
    >
      <DialogTitle>メモの追加</DialogTitle>

      <DialogContent>
        <EditNoteFields noteField={noteField} onChange={onChangeNoteField} />
      </DialogContent>

      <DialogActions>
        <Button
          disabled={noteField.text.length === 0}
          onClick={onAddNote}
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

export const AddNoteDialog = Component;
