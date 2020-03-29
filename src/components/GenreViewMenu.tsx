import React from 'react';
import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';
import { Genre } from 'services/storage/genres';
import AddGenreDialog from './MenuItem/AddGenreDialog';
import UpdateGenreDialog from './MenuItem/UpdateGenreDialog';
import RemoveGenreDialog from './MenuItem/RemoveGenreDIalog';

interface GenreViewMenuProps {
  genres: Genre[];
  addGenre: (genre: Genre) => void;
  removeGenre: (id: string) => Promise<void>;
  updateGenre: (genre: Genre) => void;
  selectedGenreId: string;
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  genres,
  addGenre,
  removeGenre,
  updateGenre,
  className,
  selectedGenreId,
}) => {
  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <StyledToolBar className={className}>
      <AddGenreDialog
        add={addGenre}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <RemoveGenreDialog
        remove={removeGenre}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <UpdateGenreDialog
        update={updateGenre}
        size="large"
        defaultGenre={
          selectedGenre || {
            id: '',
            creationDate: new Date(),
            genreName: '',
            parentGenreId: '',
            childrenGenreIds: [],
          }
        }
      />
    </StyledToolBar>
  );
};

export default GenreViewMenu;
