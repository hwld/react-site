import React, { useState } from 'react';
import { List } from '@material-ui/core';
import NoteListItem, { Note } from './NoteListItem';

interface NoteListProps {
  notes: Note[];
  selectedGenreId: string;
}

const NoteList: React.FC<NoteListProps> = ({ notes, selectedGenreId }) => {
  const [selectedNoteId, setSelectedNoteId] = useState('');

  const selectNoteItem = (id: string) => {
    if (selectedNoteId === id) {
      setSelectedNoteId('');
    } else {
      setSelectedNoteId(id);
    }
  };

  const renderListItem = () => {
    return notes
      .filter(note => note.genreId === selectedGenreId)
      .map(note => (
        <NoteListItem
          onSelectNote={() => selectNoteItem(note.id)}
          onDeleteNote={() => window.console.log('delete')}
          onEditNote={() => window.console.log('edit')}
          selected={note.id === selectedNoteId}
          note={note}
          key={note.id}
        />
      ));
  };

  return (
    <>
      <List>{renderListItem()}</List>
    </>
  );
};

export default NoteList;
