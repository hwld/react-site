import React, { forwardRef, PropsWithChildren } from 'react';
import { GenreTreeList } from '../../ui/GenreTreeList';
import { ContentColumn } from '../../ui/ContentColumn';
import { GenresViewMenu } from './GenresViewMenu';
import { useGenresContext } from '../../../../context/GenresContext';
import { useNotesContext } from '../../../../context/NotesContext';

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
        onGenreSelect={onGenreSelect}
        onGenreDrop={moveGenres}
        onNotesDrop={moveNotes}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    </ContentColumn>
  );
});
