import React, { useState, useCallback, useContext } from 'react';
import { useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import NotesContext from '../../../../context/NotesContext';
import NoteList from '../../ui/NoteList';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import ContentColumn from '../../ui/ContentColumn';
import NotesViewMenu from './NotesViewMenu';
import MobileContext from '../../../../context/MobileContext';

interface NoteViewProps {
  selectedGenreIds: string[];
  className?: string;
}

const NoteView: React.FC<NoteViewProps> = ({ selectedGenreIds, className }) => {
  const theme = useTheme();

  const { isMobile } = useContext(MobileContext);

  const { notes } = useContext(NotesContext);
  const viewNotes = notes.filter(note =>
    selectedGenreIds.includes(note.genreId),
  );

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
    return selectedGenreIds.length !== 0 ? (
      <>
        <NoteList
          notes={viewNotes}
          notesSortOrder={notesSortOrder}
          onNotesSelect={selectNoteIds}
        />
      </>
    ) : (
      <Alert severity="warning">ジャンルを選択してください</Alert>
    );
  };

  return (
    <ContentColumn
      className={className}
      content={notesContent()}
      fixedFooter={isMobile}
      footerMenu={
        <NotesViewMenu
          selectedGenreIds={selectedGenreIds}
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
