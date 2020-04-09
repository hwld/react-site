import React, { useState, useCallback, useContext } from 'react';
import { useTheme } from '@material-ui/core';
import NotesContext from '../../../../context/NotesContext';
import NoteList from '../../ui/NoteList';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import ContentColumn from '../../ui/ContentColumn';
import NotesColumnMenu from './NotesClumnMenu';

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
        <NotesColumnMenu
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
