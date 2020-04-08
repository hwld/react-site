import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core';
import NoteList from 'components/NoteList';
import { SearchNotesCriteria } from 'services/notes';
import NotesContext from 'context/NotesContext';
import ContentColumn from '../../ContentColumn';

interface SearchNotesListProps {
  searchCriteria: SearchNotesCriteria;
  className?: string;
}

const ResultList: React.FC<SearchNotesListProps> = ({
  searchCriteria,
  className,
}) => {
  const theme = useTheme();

  const { notes } = useContext(NotesContext);
  const searchNotes = (criteria: SearchNotesCriteria) => {
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
  };

  const resultNotes = searchNotes(searchCriteria);

  return (
    <ContentColumn
      className={className}
      content={<NoteList notes={resultNotes} />}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};
export default ResultList;
