import React, { useMemo } from 'react';
import AddGenreDialog from '../../operation/AddGenreDialog';

import { Genre, createDefaultGenre } from '../../../../services/genres';
import RemoveGenreDialog from '../../operation/RemoveGenreDIalog';
import UpdateGenreDialog from '../../operation/UpdateGenreDialog';

interface GenreViewMenuProps {
  genres: Genre[];
  selectedGenreIds: string[];
}

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  genres,
  selectedGenreIds,
}) => {
  const selectedGenres = genres.filter(genre =>
    selectedGenreIds.includes(genre.id),
  );

  const removeGenreDisabled = useMemo(() => {
    const parentIds = genres
      .filter(genre => selectedGenreIds.includes(genre.id))
      .map(genre => genre.parentGenreId);

    return (
      selectedGenreIds.length === 0 ||
      !parentIds.every(id => id === parentIds[0])
    );
  }, [genres, selectedGenreIds]);

  return (
    <>
      <AddGenreDialog
        disabled={selectedGenreIds.length !== 1}
        parentGenreId={selectedGenreIds[0]}
      />
      <RemoveGenreDialog
        disabled={removeGenreDisabled}
        targetGenreIds={selectedGenreIds}
      />
      <UpdateGenreDialog
        disabled={selectedGenres.length !== 1}
        defaultGenre={selectedGenres[0] || createDefaultGenre()}
      />
    </>
  );
};

export default GenreViewMenu;
