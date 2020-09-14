import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { DialogContent, DialogTitle, SvgIconProps } from '@material-ui/core';
import { useNotesContext } from '../../../context/NotesContext';
import { OperationDialog } from './OperationDialog';
import { EditNoteField } from '../ui/EditNoteFields';
import { NoteField } from '../../../types/note';

type AddNoteDialogProps = {
  disabled?: boolean;
  genreId: string;
  size?: SvgIconProps['fontSize'];
};

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  disabled,
  genreId,
  size,
}) => {
  const defaultNoteField = (): NoteField => ({
    title: '',
    text: '',
  });
  const [noteField, setNoteField] = useState<NoteField>(defaultNoteField());

  const { addNote } = useNotesContext();

  const add = () => {
    addNote(genreId, noteField);
  };

  const clearField = () => {
    setNoteField(defaultNoteField());
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNoteField(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <OperationDialog
      tooltipText="メモを追加"
      activatorIcon={<AddNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="追加"
      onDone={add}
      doneDisabled={noteField.text.length === 0}
      onOpen={clearField}
      data-testid="addNoteDialog"
    >
      <DialogTitle>メモの追加</DialogTitle>
      <DialogContent>
        <EditNoteField defaultNote={noteField} onChange={changeNoteField} />
      </DialogContent>
    </OperationDialog>
  );
};

export { AddNoteDialog };
