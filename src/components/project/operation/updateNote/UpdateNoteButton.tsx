import React, { useState, forwardRef, PropsWithChildren } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from '../OperationDialog';
import { getDefaultNote, Note, NoteField } from '../../../../services/notes';
import { useNotesContext } from '../../../../context/NotesContext';
import { UpdateNoteDialogContent } from './UpdateNoteDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

type Props = {
  disabled?: boolean;
  defaultNoteId: string;
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function UpdateNoteDialog({ disabled, defaultNoteId, size, tabIndex }, ref) {
    const { isOpen, open, close } = useDialog(false);
    const [newNote, setNewNote] = useState<Note>(getDefaultNote());
    const { notes, updateNote } = useNotesContext();

    const setDefaultNote = () => {
      const defaultNote = notes.find(note => note.id === defaultNoteId);
      if (!defaultNote) {
        throw Error('存在しないノート');
      }
      setNewNote(defaultNote);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setDefaultNote();
      open();
    };

    const handleDone = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      updateNote(newNote);
      close();
    };

    const handleCancel = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      close();
    };

    const changeNoteField = (fieldName: keyof NoteField, value: string) => {
      setNewNote(state => ({ ...state, [fieldName]: value }));
    };

    return (
      <>
        <ActivatorButton
          ref={ref}
          disabled={disabled}
          tooltipText="メモの編集"
          onClick={handleClick}
          tabIndex={tabIndex}
          data-testid="activatorButton"
        >
          <EditIcon fontSize={size} />
        </ActivatorButton>
        <OperationDialog
          open={isOpen}
          onClose={close}
          data-testid="updateNoteDialog"
        >
          <DialogTitle>メモの編集</DialogTitle>
          <UpdateNoteDialogContent
            newNoteField={newNote}
            onChangeNoteField={changeNoteField}
          />
          <DialogActions>
            <Button
              onClick={handleDone}
              disabled={newNote.text.length === 0}
              data-testid="doneButton"
            >
              <Typography color="textSecondary">変更</Typography>
            </Button>
            <Button onClick={handleCancel} data-testid="cancelButton">
              <Typography color="textSecondary">中止</Typography>
            </Button>
          </DialogActions>
        </OperationDialog>
      </>
    );
  },
);

export const UpdateNoteButton = Component;
