import React from 'react';
import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { Genre, GenreField } from 'stores/store';
import AddGenreDialog from './AddGenreDialog';
import UpdateGenreDialog from './UpdateGenreDialog';
import RemoveGenreDialog from './RemoveGenreDIalog';

interface GenreViewMenuProps {
  add: (genre: Genre) => void;
  remove: (id: string) => Promise<void>;
  update: (id: string, genre: GenreField) => void;
  selectedGenreId: string;
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  add,
  className,
  selectedGenreId,
}) => {
  const { genres } = useSelector((state: RootState) => state.reactNotes);
  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <StyledToolBar className={className}>
      <AddGenreDialog
        add={add}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <RemoveGenreDialog size="large" selectedGenreId={selectedGenreId} />
      <UpdateGenreDialog
        size="large"
        defaultGenre={selectedGenre || { id: '', genreName: '' }}
      />
    </StyledToolBar>
  );
};

export default GenreViewMenu;
