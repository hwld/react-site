import React from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { SvgIconProps } from '@material-ui/core';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { AddNoteDialog } from './AddNoteDialog';
import { NoteField } from '../../../../services/notes';

type Props = {
  disabled?: boolean;
  categoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, categoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const { addNote } = useNotesContext();

  const handleAddNote = (field: NoteField) => {
    addNote(categoryId, field);
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="メモの追加"
        onClick={open}
      >
        <AddNoteIcon fontSize={size} />
      </ActivatorButton>
      <AddNoteDialog
        isOpen={isOpen}
        onClose={close}
        onAddNote={handleAddNote}
      />
    </>
  );
};

export const AddNoteButton = Component;
