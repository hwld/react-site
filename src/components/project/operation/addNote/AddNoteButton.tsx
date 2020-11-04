import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import { useNotesContext } from '../../../../context/NotesContext';
import { OperationDialog } from '../OperationDialog';
import { getDefaultNote, NoteField } from '../../../../services/notes';
import { AddNoteDialogContent } from './AddNoteDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

type Props = {
  disabled?: boolean;
  categoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, categoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const [noteField, setNoteField] = useState<NoteField>(getDefaultNote());
  const { addNote } = useNotesContext();

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setNoteField(getDefaultNote());
    open();
  };

  const handleDone = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    addNote(categoryId, noteField);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNoteField(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="メモの追加"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <AddNoteIcon fontSize={size} />
      </ActivatorButton>
      <OperationDialog
        open={isOpen}
        onClose={close}
        data-testid="addNoteDialog"
      >
        <DialogTitle>メモの追加</DialogTitle>
        <AddNoteDialogContent
          noteField={noteField}
          onChange={changeNoteField}
        />
        <DialogActions>
          <Button
            disabled={noteField.text.length === 0}
            onClick={handleDone}
            data-testid="doneButton"
          >
            <Typography color="textSecondary">追加</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
    </>
  );
};

export const AddNoteButton = Component;
