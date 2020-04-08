import React from 'react';
import { Genre } from 'services/genres';
import AddGenreDialog from 'components/menuItem/AddGenreDialog';
import UpdateGenreDialog from 'components/menuItem/UpdateGenreDialog';
import RemoveGenreDialog from 'components/menuItem/RemoveGenreDIalog';

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
