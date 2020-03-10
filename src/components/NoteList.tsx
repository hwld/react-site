import React, { useState, useEffect } from 'react';
import { List } from '@material-ui/core';
import styled from 'styled-components';
import { RootState } from 'stores';
import { useSelector } from 'react-redux';
import NoteListItem from './NoteListItem';

interface NoteListProps {
  onNotesSelect?: (selectedIds: string[]) => void;
  selectedNoteIds?: string[];
  selectedGenreId: string;
  className?: string;
}

const Root = styled.div`
  overflow: auto;
`;

const NoteList: React.FC<NoteListProps> = ({
  onNotesSelect,
  selectedGenreId,
  className,
}) => {
  const { notes } = useSelector((state: RootState) => state.reactNotes);

  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedNoteIds([]);
  }, [selectedGenreId]);

  // 内部の選択状態が変更されるたびに通知する
  useEffect(() => {
    if (onNotesSelect) onNotesSelect(selectedNoteIds);
  }, [onNotesSelect, selectedNoteIds]);

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
