import React from 'react';
import { Genre } from 'services/storage/genres';
import AddGenreDialog from './MenuItem/AddGenreDialog';
import UpdateGenreDialog from './MenuItem/UpdateGenreDialog';
import RemoveGenreDialog from './MenuItem/RemoveGenreDIalog';

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
