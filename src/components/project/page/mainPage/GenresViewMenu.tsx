import React, { useContext } from 'react';
import AddGenreDialog from '../../operation/AddGenreDialog';

import { Genre } from '../../../../services/genres';
import RemoveGenreDialog from '../../operation/RemoveGenreDIalog';
import UpdateGenreDialog from '../../operation/UpdateGenreDialog';
import MobileContext from '../../../../context/MobileContext';

interface GenreViewMenuProps {
  genres: Genre[];
  selectedGenreId: string;
}

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  genres,
  selectedGenreId,
}) => {
  const { isMobile } = useContext(MobileContext);

  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <>
      <AddGenreDialog
        size={isMobile ? 'default' : 'large'}
        selectedGenreId={selectedGenreId}
      />
      <RemoveGenreDialog
        size={isMobile ? 'default' : 'large'}
        selectedGenreId={selectedGenreId}
      />
      <UpdateGenreDialog
        size={isMobile ? 'default' : 'large'}
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
