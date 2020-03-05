import React, { useState } from 'react';
import { List } from '@material-ui/core';
import styled from 'styled-components';
import NoteListItem, { Note } from './NoteListItem';

interface NoteListProps {
  notes: Note[];
  selectedGenreId: string;
  className?: string;
}

const Root = styled.div`
  overflow: auto;
`;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedGenreId,
  className,
}) => {
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
    <Root className={className}>
      <List>{renderListItem()}</List>
    </Root>
  );
};

export default NoteList;
