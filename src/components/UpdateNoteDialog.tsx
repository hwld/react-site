import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Note, NoteField } from 'services/storage/notes';
import MenuItemDialog from './MenuItemDialog';
import EditNoteField from './EditNoteField';

interface UpdateNoteDialogProps {
  defaultNote: Note;
  update: (note: Note) => void;
  size?: SvgIconProps['fontSize'];
}

const UpdateNoteDialog: React.FC<UpdateNoteDialogProps> = ({
  defaultNote,
  update,
  size,
}) => {
  const [note, setNote] = useState(defaultNote);

  const updateNote = () => {
    update({ ...note });
  };

  const setDefaultNote = () => {
    setNote(defaultNote);
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNote(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <MenuItemDialog
      tooltipText="メモを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      doneText="変更"
      onDone={updateNote}
      doneDisabled={note.text.length === 0}
      onOpen={setDefaultNote}
    >
      <DialogTitle>メモの編集</DialogTitle>
      <DialogContent>
        <EditNoteField note={note} onChange={changeNoteField} />
      </DialogContent>
    </MenuItemDialog>
  );
};

export default UpdateNoteDialog;
