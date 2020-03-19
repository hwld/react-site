import React from 'react';
import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';
import { Genre } from 'stores/store';
import AddGenreDialog from './AddGenreDialog';
import UpdateGenreDialog from './UpdateGenreDialog';
import RemoveGenreDialog from './RemoveGenreDIalog';

interface GenreViewMenuProps {
  genres: Genre[];
  add: (genre: Genre) => void;
  remove: (id: string) => Promise<void>;
  update: (genre: Genre) => void;
  selectedGenreId: string;
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  genres,
  add,
  remove,
  update,
  className,
  selectedGenreId,
}) => {
  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <StyledToolBar className={className}>
      <AddGenreDialog
        add={add}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <RemoveGenreDialog
        remove={remove}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <UpdateGenreDialog
        update={update}
        size="large"
        defaultGenre={
          selectedGenre || {
            id: '',
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
