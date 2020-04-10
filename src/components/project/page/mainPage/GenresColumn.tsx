import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import GenreTreeList from '../../ui/GenreTreeList';
import GenresContext from '../../../../context/GenresContext';
import ContentColumn from '../../ui/ContentColumn';
import GenreColumnMenu from './GenresColumnMenu';

interface GenreViewProps {
  onGenreSelect: (selectedId: string) => void;
  selectedGenreId: string;
  className?: string;
}

const GenreView: React.FC<GenreViewProps> = ({
  className,
  onGenreSelect,
  selectedGenreId,
}) => {
  const { genres } = useContext(GenresContext);
  const theme = useTheme();

  return (
    <ContentColumn
      className={className}
      content={<GenreTreeList genres={genres} onGenreSelect={onGenreSelect} />}
      footerMenu={
        <GenreColumnMenu genres={genres} selectedGenreId={selectedGenreId} />
      }
      footerColor={theme.palette.secondary.main}
    />
  );
};

export default GenreView;
