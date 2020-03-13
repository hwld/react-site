import React from 'react';
import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import AddGenreDialog from './AddGenreDialog';
import UpdateGenreDialog from './UpdateGenreDialog';
import RemoveGenreDialog from './RemoveGenreDIalog';

interface GenreViewMenuProps {
  selectedGenreId: string;
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  className,
  selectedGenreId,
}) => {
  const { genres } = useSelector((state: RootState) => state.reactNotes);
  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <StyledToolBar className={className}>
      <AddGenreDialog size="large" selectedGenreId={selectedGenreId} />
      <RemoveGenreDialog size="large" selectedGenreId={selectedGenreId} />
      <UpdateGenreDialog
        size="large"
        defaultGenre={selectedGenre || { id: '', genreName: '' }}
      />
    </StyledToolBar>
  );
};

export default GenreViewMenu;
