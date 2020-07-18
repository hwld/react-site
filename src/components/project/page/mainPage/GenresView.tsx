import React, { useContext } from 'react';
import GenreTreeList from '../../ui/GenreTreeList';
import GenresContext from '../../../../context/GenresContext';
import ContentColumn from '../../ui/ContentColumn';
import GenreViewMenu from './GenresViewMenu';

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
  const { genres, moveGenre } = useContext(GenresContext);

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
        onDrop={moveGenre}
      />
    </ContentColumn>
  );
};

export default GenresView;
