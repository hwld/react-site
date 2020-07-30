import React from 'react';
import { GenreTreeList } from '../../ui/GenreTreeList';
import { ContentColumn } from '../../ui/ContentColumn';
import { GenresViewMenu } from './GenresViewMenu';
import { useGenresContext } from '../../../../context/GenresContext';
import { useNotesContext } from '../../../../context/NotesContext';

type GenresViewProps = {
  onGenreSelect: (selectedId: string[]) => void;
  selectedGenreIds: string[];
  className?: string;
};

const GenresView: React.FC<GenresViewProps> = ({
  onGenreSelect,
  selectedGenreIds,
  className,
}) => {
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
      />
    </ContentColumn>
  );
};

export { GenresView };
