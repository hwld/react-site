import React, { useContext, useMemo, useCallback } from 'react';
import { useTheme } from '@material-ui/core';
import ContentColumn from '../../ui/ContentColumn';
import { SearchNotesCriteria } from '../../../../services/notes';
import NotesContext from '../../../../context/NotesContext';
import NoteList from '../../ui/NoteList';
import MobileContext from '../../../../context/MobileContext';

interface SearchNotesListProps {
  searchCriteria: SearchNotesCriteria;
  className?: string;
}

const ResultList: React.FC<SearchNotesListProps> = ({
  searchCriteria,
  className,
}) => {
  const theme = useTheme();

  const { isMobile } = useContext(MobileContext);

  const { notes } = useContext(NotesContext);

  const getSearchNotes = useCallback(
    (criteria: SearchNotesCriteria) => {
      return (
        notes
          // ジャンルIDでの検索
          .filter(note => {
            if (criteria.genreId === '') {
              return true;
            }

            return note.genreId === criteria.genreId;
          })
          // タイトルでの検索
          .filter(note => {
            if (criteria.title === '') {
              return true;
            }

            return note.title.includes(criteria.title);
          })
          // メモ本文での検索
          .filter(note => {
            if (criteria.text === '') {
              return true;
            }

            return note.text.includes(criteria.text);
          })
          // 著者名での検索
          .filter(note => {
            if (criteria.authorName === '') {
              return true;
            }

            return note.authorName === criteria.authorName;
          })
          // 書籍名での検索
          .filter(note => {
            if (criteria.bookName === '') {
              return true;
            }

            return note.bookName === criteria.bookName;
          })
      );
    },
    [notes],
  );

  const searchNotes = useMemo(() => getSearchNotes(searchCriteria), [
    getSearchNotes,
    searchCriteria,
  ]);

  return (
    <ContentColumn
      className={className}
      content={<NoteList notes={searchNotes} searchCriteria={searchCriteria} />}
      fixedFooter={isMobile}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};
export default ResultList;