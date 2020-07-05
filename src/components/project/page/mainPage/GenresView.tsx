import React, { useContext } from 'react';
import GenreTreeList from '../../ui/GenreTreeList';
import GenresContext from '../../../../context/GenresContext';
import ContentColumn from '../../ui/ContentColumn';
import GenreViewMenu from './GenresViewMenu';

interface GenresViewProps {
  onGenreSelect: (selectedId: string[]) => void;
  selectedGenreIds: string[];
  className?: string;
}

const GenresView: React.FC<GenresViewProps> = ({
  onGenreSelect,
  selectedGenreIds,
  className,
}) => {
  const { genres, moveGenre } = useContext(GenresContext);

  const moveGenres = (genreIds: string[], destGenreId: string) => {
    const sourceGenres = genreIds.map(id => {
      const sourceGenre = genres.find(genre => genre.id === id);
      if (!sourceGenre) {
        throw Error();
      }

      return sourceGenre;
    });

    sourceGenres.forEach(sourceGenre => moveGenre(sourceGenre, destGenreId));
  };

  return (
    <ContentColumn
      className={className}
      footerMenu={
        <GenreViewMenu genres={genres} selectedGenreIds={selectedGenreIds} />
      }
    >
      <GenreTreeList
        multiple
        genres={genres}
        selectedGenreIds={selectedGenreIds}
        onGenreSelect={onGenreSelect}
        isDrag
        onDrop={moveGenres}
      />
    </ContentColumn>
  );
};

export default GenresView;
