import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Note } from 'stores/store';
import NoteListItem from './NoteListItem';
import List from './util/List/List';

interface NoteListProps {
  notes: Note[];
  onNotesSelect?: (selectedIds: string[]) => void;
  selectedNoteIds?: string[];
  selectedGenreId: string;
  className?: string;
}

const StyledList = styled(List)`
  overflow: auto;
`;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onNotesSelect,
  selectedGenreId,
  className,
}) => {
  const renderListItem = useCallback(() => {
    return notes
      .filter(note => note.genreId === selectedGenreId)
      .map(note => <NoteListItem note={note} key={note.id} />);
  }, [notes, selectedGenreId]);

  return (
    <StyledList className={className} onSelect={onNotesSelect}>
      {renderListItem()}
    </StyledList>
  );
};

export default NoteList;
