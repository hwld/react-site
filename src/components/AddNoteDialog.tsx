import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { DialogContent, DialogTitle, SvgIconProps } from '@material-ui/core';
import { Note, NoteField } from 'services/storage/notes';
import MenuItemDialog from './MenuItemDialog';
import EditNoteField from './EditNoteField';

interface AddNoteDialogProps {
  add: (note: Note) => void;
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  add,
  selectedGenreId,
  size,
}) => {
  const [note, setNote] = useState<NoteField>({
    title: '',
    text: '',
    authorName: '',
    bookName: '',
  });

  const addNote = () => {
    add({
      id: '',
      genreId: selectedGenreId,
      title: note.title,
      text: note.text,
      authorName: note.authorName,
      bookName: note.bookName,
    });
  };

  const clearField = () => {
    setNote({ title: '', text: '', authorName: '', bookName: '' });
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNote(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <MenuItemDialog
      tooltipText="メモを追加"
      activatorIcon={<AddNoteIcon fontSize={size} />}
      activatorDisabled={selectedGenreId === ''}
      doneText="追加"
      onDone={addNote}
      doneDisabled={note.text.length === 0}
      onOpen={clearField}
    >
      <DialogTitle>メモの追加</DialogTitle>
      <DialogContent>
        <EditNoteField note={note} onChange={changeNoteField} />
      </DialogContent>
    </MenuItemDialog>
  );
};

export default AddNoteDialog;
