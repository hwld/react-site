import React, { useContext } from 'react';
import GenreTreeList from '../../ui/GenreTreeList';
import GenresContext from '../../../../context/GenresContext';
import ContentColumn from '../../ui/ContentColumn';
import GenreViewMenu from './GenresViewMenu';
import NotesContext from '../../../../context/NotesContext';

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
  const { moveNote } = useContext(NotesContext);

  return (
    <ContentColumn
      className={className}
      footerMenu={<GenreViewMenu selectedGenreIds={selectedGenreIds} />}
    >
      <GenreTreeList
        multiple
        genres={genres}
        selectedGenreIds={selectedGenreIds}
        onGenreSelect={onGenreSelect}
        isDrag
        onGenreDrop={moveGenre}
        onNoteDrop={moveNote}
      />
    </ContentColumn>
  );
};

export default GenresView;
