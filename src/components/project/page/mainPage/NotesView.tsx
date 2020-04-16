import React, { useState, useCallback, useContext } from 'react';
import { useTheme, Typography, Card, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import NotesContext from '../../../../context/NotesContext';
import NoteList from '../../ui/NoteList';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import ContentColumn from '../../ui/ContentColumn';
import NotesViewMenu from './NotesViewMenu';
import MobileContext from '../../../../context/MobileContext';
import GenresContext from '../../../../context/GenresContext';

const StyledNoteList = styled(NoteList)`
  padding-top: 20px;
`;

interface NoteViewProps {
  selectedGenreId: string;
  className?: string;
}

const NoteView: React.FC<NoteViewProps> = ({ selectedGenreId, className }) => {
  const theme = useTheme();

  const { isMobile } = useContext(MobileContext);

  const { genres } = useContext(GenresContext);
  const selectedGenreName = genres.find(genre => genre.id === selectedGenreId)
    ?.genreName;

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
      <>
        <Card>
          <CardContent>
            <Typography>{selectedGenreName}</Typography>
          </CardContent>
        </Card>
        <StyledNoteList
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
