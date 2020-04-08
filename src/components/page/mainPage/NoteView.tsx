import React, { useState, useCallback, useContext } from 'react';
import NoteList from 'components/NoteList';
import { useTheme } from '@material-ui/core';
import NotesContext from 'context/NotesContext';
import { NotesSortOrder } from '../../NotesSortConditionField';
import ContentColumn from '../../ContentColumn';
import NoteViewMenu from './NoteViewMenu';

interface NoteViewProps {
  selectedGenreId: string;
  className?: string;
}

const NoteView: React.FC<NoteViewProps> = ({ selectedGenreId, className }) => {
  const theme = useTheme();

  const { notes } = useContext(NotesContext);
  const viewNotes = notes.filter(note => note.genreId === selectedGenreId);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  const [notesSortOrder, setNotesSortOrder] = useState<NotesSortOrder>({
    targetField: 'creationDate',
    order: 'asc',
  });

  const sortNotes = (order: NotesSortOrder) => {
    setNotesSortOrder(order);
  };

  const selectNoteIds = useCallback((ids: string[]) => {
    setSelectedNoteIds(ids);
  }, []);

  return (
    <ContentColumn
      className={className}
      content={
        <NoteList
          notes={viewNotes}
          notesSortOrder={notesSortOrder}
          onNotesSelect={selectNoteIds}
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
      footerColor={theme.palette.secondary.main}
    />
  );
};

export default NoteView;
