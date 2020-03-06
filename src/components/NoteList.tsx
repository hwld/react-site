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
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  const selectNotesItem = (id: string) => {
    if (selectedNoteIds.includes(id)) {
      setSelectedNoteIds(Ids => Ids.filter(selectedId => selectedId !== id));
    } else {
      setSelectedNoteIds(Ids => [...Ids, id]);
    }
  };

  const renderListItem = () => {
    return notes
      .filter(note => note.genreId === selectedGenreId)
      .map(note => (
        <NoteListItem
          onSelectNote={() => selectNotesItem(note.id)}
          onDeleteNote={() => window.console.log('delete')}
          onEditNote={() => window.console.log('edit')}
          selected={selectedNoteIds.includes(note.id)}
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
