import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from './OperationDialog';
import { EditNoteField } from '../ui/EditNoteFields';
import {
  useNotesContext,
  Note,
  NoteField,
} from '../../../context/NotesContext';

type UpdateNoteDialogProps = {
  defaultNote: Note;
  size?: SvgIconProps['fontSize'];
};

const UpdateNoteDialog: React.FC<UpdateNoteDialogProps> = ({
  defaultNote,
  size,
}) => {
  const [note, setNote] = useState(defaultNote);
  const { updateNote } = useNotesContext();

  const update = () => {
    updateNote(note);
  };

  const setDefaultNote = () => {
    setNote(defaultNote);
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNote(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <OperationDialog
      tooltipText="メモを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      doneText="変更"
      onDone={update}
      doneDisabled={note.text.length === 0}
      onOpen={setDefaultNote}
      data-testid="updateNoteDialog"
    >
      <DialogTitle>メモの編集</DialogTitle>
      <DialogContent>
        <EditNoteField defaultNote={note} onChange={changeNoteField} />
      </DialogContent>
    </OperationDialog>
  );
};

export { UpdateNoteDialog };
