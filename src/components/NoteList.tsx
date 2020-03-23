import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Note } from 'stores/store';
import NoteListItem from './NoteListItem';
import List from './util/List/List';

interface NoteListProps {
  notes: Note[];
  removeNote: (id: string) => void;
  updateNote: (note: Note) => void;
  onNotesSelect?: (selectedIds: string[]) => void;
  selectedNoteIds?: string[];
  selectedGenreId: string;
  className?: string;
}

const StyledList = styled(List)`
  overflow: auto;
  word-break: break-all;
`;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  removeNote,
  updateNote,
  onNotesSelect,
  selectedGenreId,
  className,
}) => {
  const renderListItem = useCallback(() => {
    return notes
      .filter(note => note.genreId === selectedGenreId)
      .map(note => (
        <NoteListItem
          remove={removeNote}
          update={updateNote}
          note={note}
          key={note.id}
        />
      ));
  }, [notes, removeNote, selectedGenreId, updateNote]);

  return (
    <StyledList className={className} onSelect={onNotesSelect}>
      {renderListItem()}
    </StyledList>
  );
};

export default NoteList;
