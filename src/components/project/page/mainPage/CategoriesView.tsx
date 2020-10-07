import React, { forwardRef, PropsWithChildren } from 'react';
import { GenreTreeList } from '../../ui/CategoryTreeList';
import { ContentColumn } from '../../ui/ContentColumn';
import { GenresViewMenu } from './CategoriesViewMenu';
import { useGenresContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';

type GenresViewProps = {
  onGenreSelect: (selectedId: string[]) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  selectedGenreIds: string[];
  className?: string;
};

export const GenresView = forwardRef<
  HTMLUListElement,
  PropsWithChildren<GenresViewProps>
>(function GenresView(
  { onGenreSelect, selectedGenreIds, className, onKeyDown },
  ref,
) {
  const { genres, moveGenres } = useGenresContext();
  const { moveNotes } = useNotesContext();

  const { expandedIds, setExpandedIds } = useAppStateContext();

  const handleExpand = (ids: string[]) => {
    setExpandedIds(ids);
  };

  return (
    <ContentColumn
      className={className}
      footerMenu={<GenresViewMenu selectedGenreIds={selectedGenreIds} />}
    >
      <GenreTreeList
        draggable
        multiple
        genres={genres}
        selectedGenreIds={selectedGenreIds}
        expanded={expandedIds}
        onExpand={handleExpand}
        onGenreSelect={onGenreSelect}
        onGenreDrop={moveGenres}
        onNotesDrop={moveNotes}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    </ContentColumn>
  );
});
