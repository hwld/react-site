import React, { useState, useCallback, useContext } from 'react';
import { useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import NotesContext from '../../../../context/NotesContext';
import NoteList from '../../ui/NoteList';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import ContentColumn from '../../ui/ContentColumn';
import NotesViewMenu from './NotesViewMenu';

interface NoteViewProps {
  selectedGenreId: string;
  isMobile: boolean;
  className?: string;
}

const NoteView: React.FC<NoteViewProps> = ({
  selectedGenreId,
  isMobile,
  className,
}) => {
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

  const notesContent = () => {
    return selectedGenreId !== '' ? (
      <NoteList
        notes={viewNotes}
        notesSortOrder={notesSortOrder}
        onNotesSelect={selectNoteIds}
      />
    ) : (
      <Alert severity="warning">ジャンルを選択してください</Alert>
    );
  };

  return (
    <ContentColumn
      fullWidth={isMobile}
      className={className}
      content={notesContent()}
      footerMenu={
        <NotesViewMenu
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
