import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { SvgIconProps } from '@material-ui/core';
import { useNotesContext } from '../../../../context/NotesContext';
import { OperationDialog } from '../OperationDialog';
import { getDefaultNote, NoteField } from '../../../../services/notes';
import { AddNoteDialogContent } from './AddNoteDialogContent';

type AddNoteDialogProps = {
  disabled?: boolean;
  categoryId: string;
  size?: SvgIconProps['fontSize'];
};

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  disabled,
  categoryId,
  size,
}) => {
  const [noteField, setNoteField] = useState<NoteField>(getDefaultNote());

  const { addNote } = useNotesContext();

  const add = () => {
    addNote(categoryId, noteField);
  };

  const clearField = () => {
    setNoteField(getDefaultNote());
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNoteField(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <OperationDialog
      title="メモの追加"
      activatorIcon={<AddNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="追加"
      onDone={add}
      doneDisabled={noteField.text.length === 0}
      onOpen={clearField}
      data-testid="addNoteDialog"
    >
      <AddNoteDialogContent noteField={noteField} onChange={changeNoteField} />
    </OperationDialog>
  );
};

export { AddNoteDialog };
