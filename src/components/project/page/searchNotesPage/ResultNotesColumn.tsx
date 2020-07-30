import React, { useMemo, useCallback } from 'react';
import { ContentColumn } from '../../ui/ContentColumn';
import { SearchNotesCriteria } from '../../../../repositories/notes';
import { useNotesContext } from '../../../../context/NotesContext';
import { useMobileContext } from '../../../../context/MobileContext';
import { NoteList } from '../../ui/NoteList';

type SearchNotesColumnProps = {
  searchCriteria: SearchNotesCriteria;
  className?: string;
};

const ResultNotesColumn: React.FC<SearchNotesColumnProps> = ({
  searchCriteria,
  className,
}) => {
  const { isMobile } = useMobileContext();

  const { notes } = useNotesContext();

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
    <ContentColumn className={className} fixedFooter={isMobile}>
      <NoteList notes={searchNotes} searchCriteria={searchCriteria} />
    </ContentColumn>
  );
};
export { ResultNotesColumn };
