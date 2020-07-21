import React from 'react';
import GenreTreeList from '../../ui/GenreTreeList';
import ContentColumn from '../../ui/ContentColumn';
import GenreViewMenu from './GenresViewMenu';
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
  const { genres, moveGenre } = useGenresContext();
  const { moveNotes } = useNotesContext();

  return (
    <ContentColumn
      className={className}
      footerMenu={<GenreViewMenu selectedGenreIds={selectedGenreIds} />}
    >
      <GenreTreeList
        draggable
        multiple
        genres={genres}
        selectedGenreIds={selectedGenreIds}
        onGenreSelect={onGenreSelect}
        onGenreDrop={moveGenre}
        onNotesDrop={moveNotes}
      />
    </ContentColumn>
  );
};

export default GenresView;
