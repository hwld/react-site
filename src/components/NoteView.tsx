import React, { useState, useCallback } from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import NoteList from 'components/NoteList';
import styled from 'styled-components';
import NoteViewMenu from 'components/NoteViewMenu';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useNotes } from 'services/storage/notes';

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
  const { uid } = useSelector((state: RootState) => state.reactNotes);
  if (!uid) {
    throw new Error('ログインされていません');
  }
  const { notes, addNote, removeNote, updateNote } = useNotes(uid);

  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  const selectNoteIds = useCallback((ids: string[]) => {
    setSelectedNoteIds(ids);
  }, []);

  return (
    <View className={className}>
      <Toolbar />
      <Divider />
      <StyledNoteList
        notes={notes}
        removeNote={removeNote}
        updateNote={updateNote}
        onNotesSelect={selectNoteIds}
        selectedGenreId={selectedGenreId}
      />
      <StyledNoteViewMenu
        addNote={addNote}
        removeNote={removeNote}
        selectedNoteIds={selectedNoteIds}
        selectedGenreId={selectedGenreId}
      />
    </View>
  );
};

export default NoteView;
