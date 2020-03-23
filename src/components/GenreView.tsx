import React from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import GenreTreeList from 'components/GenreTreeList';
import styled from 'styled-components';
import { useGenres } from 'services/storage/genres';
import { useCurrentUserId } from 'services/auth';
import GenreViewMenu from './GenreViewMenu';

interface GenreViewProps {
  onGenreSelect: (selectedId: string) => void;
  selectedGenreId: string;
  className?: string;
}

const View = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 85%;
`;

const StyledGenreViewMenu = styled(GenreViewMenu)`
  background-color: ${props => props.theme.palette.secondary.main};
  flex-grow: 1;
`;

const GenreView: React.FC<GenreViewProps> = ({
  onGenreSelect,
  selectedGenreId,
}) => {
  const { userId } = useCurrentUserId();
  const { genres, addGenre, removeGenre, updateGenre } = useGenres(userId);

  return (
    <View>
      <Toolbar />
      <Divider />
      <StyledGenreTreeList genres={genres} onGenreSelect={onGenreSelect} />
      <StyledGenreViewMenu
        genres={genres}
        addGenre={addGenre}
        removeGenre={removeGenre}
        updateGenre={updateGenre}
        selectedGenreId={selectedGenreId}
      />
    </View>
  );
};

export default GenreView;
