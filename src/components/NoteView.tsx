import React, { useState, useCallback } from 'react';
import NoteList from 'components/NoteList';
import { useNotes } from 'services/storage/notes';
import { useCurrentUserId } from 'services/auth';
import { NotesSortOrder } from './NotesSortConditionField';
import ContentView from './ContentView';
import NoteViewMenu from './NoteViewMenu';

interface NoteViewProps {
  selectedGenreId: string;
  className?: string;
}

const NoteView: React.FC<NoteViewProps> = ({ selectedGenreId, className }) => {
  const { userId } = useCurrentUserId();
  const { notes } = useNotes(userId);
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
    <ContentView
      pageType="main"
      content={
        <NoteList
          notes={notes}
          notesSortOrder={notesSortOrder}
          onNotesSelect={selectNoteIds}
          selectedGenreId={selectedGenreId}
        />
      }
      footerMenu={
        <NoteViewMenu
          selectedGenreId={selectedGenreId}
          selectedNoteIds={selectedNoteIds}
          defaultNotesSortOrder={notesSortOrder}
          sortNotes={sortNotes}
        />
      }
    />
  );
};

export default NoteView;
