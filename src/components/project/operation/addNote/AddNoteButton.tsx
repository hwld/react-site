import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { SvgIconProps } from '@material-ui/core';
import { useNotesContext } from '../../../../context/NotesContext';
import { OperationDialog } from '../OperationDialog';
import { getDefaultNote, NoteField } from '../../../../services/notes';
import { AddNoteDialogContent } from './AddNoteDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  disabled?: boolean;
  categoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, categoryId, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteField, setNoteField] = useState<NoteField>(getDefaultNote());
  const { addNote } = useNotesContext();

  const add = () => {
    addNote(categoryId, noteField);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(true);
    setNoteField(getDefaultNote());
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNoteField(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <>
      <OperationIconButton
        disabled={disabled}
        tooltipText="メモの追加"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <AddNoteIcon fontSize={size} />
      </OperationIconButton>
      <OperationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="メモの追加"
        doneText="追加"
        onDone={add}
        doneDisabled={noteField.text.length === 0}
        data-testid="addNoteDialog"
      >
        <AddNoteDialogContent
          noteField={noteField}
          onChange={changeNoteField}
        />
      </OperationDialog>
    </>
  );
};

export const AddNoteButton = Component;
