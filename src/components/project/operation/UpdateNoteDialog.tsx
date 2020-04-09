import React, { useState, useContext } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Note, NoteField } from '../../../services/notes';
import NotesContext from '../../../context/NotesContext';
import OperationDialog from './OperationDialog';
import EditNoteField from '../ui/EditNoteFields';

interface UpdateNoteDialogProps {
  defaultNote: Note;
  size?: SvgIconProps['fontSize'];
}

const UpdateNoteDialog: React.FC<UpdateNoteDialogProps> = ({
  defaultNote,
  size,
}) => {
  const [note, setNote] = useState(defaultNote);
  const { updateNote } = useContext(NotesContext);

  const update = () => {
    updateNote(note.id, note);
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
    >
      <DialogTitle>メモの編集</DialogTitle>
      <DialogContent>
        <EditNoteField defaultNote={note} onChange={changeNoteField} />
      </DialogContent>
    </OperationDialog>
  );
};

export default UpdateNoteDialog;
