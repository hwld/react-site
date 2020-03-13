import React, { useState, useEffect, useCallback } from 'react';
import { List } from '@material-ui/core';
import styled from 'styled-components';
import { Note } from 'stores/store';
import NoteListItem from './NoteListItem';

interface NoteListProps {
  notes: Note[];
  onNotesSelect?: (selectedIds: string[]) => void;
  selectedNoteIds?: string[];
  selectedGenreId: string;
  className?: string;
}

const Root = styled.div`
  overflow: auto;
`;

const StyledList = styled(List)`
  padding-top: 0;
  padding-bottom: 0;
`;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onNotesSelect,
  selectedGenreId,
  className,
}) => {
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  // ジャンルが変更されたら選択状態をリセットする
  useEffect(() => {
    setSelectedNoteIds([]);
  }, [selectedGenreId]);

  // 内部の選択状態が変更されるたびに通知する
  useEffect(() => {
    if (onNotesSelect) onNotesSelect(selectedNoteIds);
  }, [onNotesSelect, selectedNoteIds]);

  // 削除、移動したメモの選択状態を解除する
  useEffect(() => {
    const viewNoteIds = notes
      .filter(note => note.genreId === selectedGenreId)
      .map(note => note.id);

    selectedNoteIds.forEach(id => {
      if (!viewNoteIds.includes(id)) {
        setSelectedNoteIds(selectedIds =>
          selectedIds.filter(selectedId => selectedId !== id),
        );
      }
    });
  }, [notes, selectedGenreId, selectedNoteIds]);

  const renderListItem = useCallback(() => {
    const selectNotesItem = (id: string) => {
      if (selectedNoteIds.includes(id)) {
        setSelectedNoteIds(Ids => Ids.filter(selectedId => selectedId !== id));
      } else {
        setSelectedNoteIds(Ids => [...Ids, id]);
      }
    };

    return notes
      .filter(note => note.genreId === selectedGenreId)
      .map(note => (
        <NoteListItem
          onSelectNote={() => selectNotesItem(note.id)}
          selected={selectedNoteIds.includes(note.id)}
          note={note}
          key={note.id}
        />
      ));
  }, [notes, selectedGenreId, selectedNoteIds]);

  return (
    <Root className={className}>
      <StyledList>{renderListItem()}</StyledList>
    </Root>
  );
};

export default NoteList;
