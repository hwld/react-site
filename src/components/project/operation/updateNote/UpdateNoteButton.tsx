import React, { useState, forwardRef, PropsWithChildren } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { getDefaultNote, Note, NoteField } from '../../../../services/notes';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { UpdateNoteDialog } from './UpdateNoteDialog';

type Props = {
  disabled?: boolean;
  defaultNoteId: string;
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function UpdateNoteButton({ disabled, defaultNoteId, size, tabIndex }, ref) {
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

    const handleUpdateNote = (event: React.SyntheticEvent) => {
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
        <UpdateNoteDialog
          isOpen={isOpen}
          onClose={close}
          newNoteField={newNote}
          onChangeNoteField={changeNoteField}
          onUpdateNote={handleUpdateNote}
          onCancel={handleCancel}
        />
      </>
    );
  },
);

export const UpdateNoteButton = Component;
