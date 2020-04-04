import React from 'react';
import GenreTreeList from 'components/GenreTreeList';
import { useGenres } from 'services/storage/genres';
import { useCurrentUserId } from 'services/auth';
import { useTheme } from '@material-ui/core/styles';
import ContentView from './ContentView';
import GenreViewMenu from './GenreViewMenu';

interface GenreViewProps {
  onGenreSelect: (selectedId: string) => void;
  selectedGenreId: string;
  className?: string;
}

const GenreView: React.FC<GenreViewProps> = ({
  onGenreSelect,
  selectedGenreId,
}) => {
  const { userId } = useCurrentUserId();
  const { genres } = useGenres(userId);
  const theme = useTheme();

  return (
    <ContentView
      content={<GenreTreeList genres={genres} onGenreSelect={onGenreSelect} />}
      footerMenu={
        <GenreViewMenu genres={genres} selectedGenreId={selectedGenreId} />
      }
      footerColor={theme.palette.secondary.main}
    />
  );
};

export default GenreView;
