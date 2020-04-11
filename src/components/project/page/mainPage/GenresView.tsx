import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import GenreTreeList from '../../ui/GenreTreeList';
import GenresContext from '../../../../context/GenresContext';
import ContentColumn from '../../ui/ContentColumn';
import GenreViewMenu from './GenresViewMenu';

interface GenreViewProps {
  onGenreSelect: (selectedId: string) => void;
  selectedGenreId: string;
  className?: string;
}

const GenreView: React.FC<GenreViewProps> = ({
  onGenreSelect,
  selectedGenreId,
  className,
}) => {
  const { genres } = useContext(GenresContext);
  const theme = useTheme();

  return (
    <ContentColumn
      className={className}
      content={<GenreTreeList genres={genres} onGenreSelect={onGenreSelect} />}
      footerMenu={
        <GenreViewMenu genres={genres} selectedGenreId={selectedGenreId} />
      }
      footerColor={theme.palette.secondary.main}
    />
  );
};

export default GenreView;
