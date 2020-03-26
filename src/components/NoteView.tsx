import React, { useState, useCallback } from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import NoteList from 'components/NoteList';
import styled from 'styled-components';
import NoteViewMenu from 'components/NoteViewMenu';
import { useNotes } from 'services/storage/notes';
import { useCurrentUserId } from 'services/auth';
import { NotesSortOrder } from './NotesSortConditionField';

interface NoteViewProps {
  selectedGenreId: string;
  className?: string;
}

const View = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledNoteList = styled(NoteList)`
  height: 85%;
`;

const StyledNoteViewMenu = styled(NoteViewMenu)`
  background-color: ${props => props.theme.palette.secondary.main};
  flex: 1;
`;

const NoteView: React.FC<NoteViewProps> = ({ selectedGenreId, className }) => {
  const { userId } = useCurrentUserId();
  const { notes, addNote, removeNote, updateNote } = useNotes(userId);
  const [notesSortOrder, setNotesSortOrder] = useState<NotesSortOrder>({
    targetField: 'creationDate',
    order: 'asc',
  });
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  const sortNotes = (order: NotesSortOrder) => {
    setNotesSortOrder(order);
  };

  const selectNoteIds = useCallback((ids: string[]) => {
    setSelectedNoteIds(ids);
  }, []);

  return (
    <View className={className}>
      <Toolbar />
      <Divider />
      <StyledNoteList
        notes={notes}
        notesOrder={notesSortOrder}
        removeNote={removeNote}
        updateNote={updateNote}
        onNotesSelect={selectNoteIds}
        selectedGenreId={selectedGenreId}
      />
      <StyledNoteViewMenu
        addNote={addNote}
        removeNote={removeNote}
        sortNotes={sortNotes}
        defaultNotesSortOrder={notesSortOrder}
        selectedNoteIds={selectedNoteIds}
        selectedGenreId={selectedGenreId}
      />
    </View>
  );
};

export default NoteView;
