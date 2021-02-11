import React, { useMemo, useCallback } from 'react';
import { ContentColumn } from '../../ui/ContentColumn';
import { useNotesContext } from '../../../../context/NotesContext';
import { NoteList } from '../../ui/NoteList/NoteList';
import { SearchNotesCriteria } from '../../../../services/notes';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  searchCriteria: SearchNotesCriteria;
  className?: string;
};

const Component: React.FC<Props> = ({ searchCriteria, className }) => {
  const { isMobile } = useAppStateContext();

  const { notes } = useNotesContext();

  const getSearchNotes = useCallback(
    (criteria: SearchNotesCriteria) => {
      return (
        notes
          // カテゴリーIDでの検索
          .filter(note => {
            if (criteria.categoryId === '') {
              return true;
            }

            return note.categoryId === criteria.categoryId;
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
      );
    },
    [notes],
  );

  const searchNotes = useMemo(() => getSearchNotes(searchCriteria), [
    getSearchNotes,
    searchCriteria,
  ]);

  return (
    <ContentColumn className={className} isMobile={isMobile}>
      <NoteList
        notes={searchNotes}
        searchCriteria={searchCriteria}
        isMobile={isMobile}
      />
    </ContentColumn>
  );
};
export const ResultNotesColumn = Component;
