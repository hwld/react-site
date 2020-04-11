import React from 'react';
import AddGenreDialog from '../../operation/AddGenreDialog';

import { Genre } from '../../../../services/genres';
import RemoveGenreDialog from '../../operation/RemoveGenreDIalog';
import UpdateGenreDialog from '../../operation/UpdateGenreDialog';

interface GenreViewMenuProps {
  genres: Genre[];
  selectedGenreId: string;
}

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  genres,
  selectedGenreId,
}) => {
  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <>
      <AddGenreDialog size="large" selectedGenreId={selectedGenreId} />
      <RemoveGenreDialog size="large" selectedGenreId={selectedGenreId} />
      <UpdateGenreDialog
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
    </>
  );
};

export default GenreViewMenu;
