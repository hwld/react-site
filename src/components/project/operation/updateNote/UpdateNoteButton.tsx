import React, { useState, forwardRef, PropsWithChildren } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from '../OperationDialog';
import { getDefaultNote, Note, NoteField } from '../../../../services/notes';
import { useNotesContext } from '../../../../context/NotesContext';
import { UpdateNoteDialogContent } from './UpdateNoteDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  disabled?: boolean;
  defaultNoteId: string;
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function UpdateNoteDialog({ disabled, defaultNoteId, size, tabIndex }, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [newNote, setNewNote] = useState<Note>(getDefaultNote());
    const { notes, updateNote } = useNotesContext();

    const update = () => {
      updateNote(newNote);
    };

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
      setIsOpen(true);
    };

    const changeNoteField = (fieldName: keyof NoteField, value: string) => {
      setNewNote(state => ({ ...state, [fieldName]: value }));
    };

    return (
      <OperationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="メモの編集"
        activator={
          <OperationIconButton
            ref={ref}
            disabled={disabled}
            tooltipText="メモの編集"
            onClick={handleClick}
            tabIndex={tabIndex}
            data-testid="activatorButton"
          >
            <EditIcon fontSize={size} />
          </OperationIconButton>
        }
        doneText="変更"
        onDone={update}
        doneDisabled={newNote.text.length === 0}
        data-testid="updateNoteDialog"
      >
        <UpdateNoteDialogContent
          newNoteField={newNote}
          onChangeNoteField={changeNoteField}
        />
      </OperationDialog>
    );
  },
);

export const UpdateNoteButton = Component;
