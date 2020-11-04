import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { SvgIconProps } from '@material-ui/core';
import { useNotesContext } from '../../../../context/NotesContext';
import { getDefaultNote, NoteField } from '../../../../services/notes';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { AddNoteDialog } from './AddNoteDialog';

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

  const handleAddNote = (event: React.SyntheticEvent) => {
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
      <AddNoteDialog
        isOpen={isOpen}
        onClose={close}
        noteField={noteField}
        onAddNote={handleAddNote}
        onCancel={handleCancel}
        onChangeNoteField={changeNoteField}
      />
    </>
  );
};

export const AddNoteButton = Component;
