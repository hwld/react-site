import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import GenreTreeList from '../../ui/GenreTreeList';
import GenresContext from '../../../../context/GenresContext';
import ContentColumn from '../../ui/ContentColumn';
import GenreViewMenu from './GenresViewMenu';

interface GenreViewProps {
  onGenreSelect: (selectedId: string[]) => void;
  selectedGenreIds: string[];
  className?: string;
}

const GenreView: React.FC<GenreViewProps> = ({
  onGenreSelect,
  selectedGenreIds,
  className,
}) => {
  const { genres } = useContext(GenresContext);
  const theme = useTheme();

  return (
    <ContentColumn
      className={className}
      content={
        <GenreTreeList
          multiple
          genres={genres}
          selectedGenreIds={selectedGenreIds}
          onGenreSelect={onGenreSelect}
        />
      }
      footerMenu={
        <GenreViewMenu genres={genres} selectedGenreIds={selectedGenreIds} />
      }
      footerColor={theme.palette.secondary.main}
    />
  );
};

export default GenreView;
