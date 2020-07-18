import React from 'react';
import AddGenreDialog from '../../operation/AddGenreDialog';
import RemoveGenreDialog from '../../operation/RemoveGenreDIalog';
import UpdateGenreDialog from '../../operation/UpdateGenreDialog';

interface GenresViewMenuProps {
  selectedGenreIds: string[];
}

const GenresViewMenu: React.FC<GenresViewMenuProps> = ({
  selectedGenreIds,
}) => {
  return (
    <>
      <AddGenreDialog
        disabled={selectedGenreIds.length > 1}
        parentGenreId={selectedGenreIds[0]}
      />
      <RemoveGenreDialog
        disabled={selectedGenreIds.length === 0}
        targetGenreIds={selectedGenreIds}
      />
      <UpdateGenreDialog
        disabled={selectedGenreIds.length !== 1}
        defaultGenreId={selectedGenreIds[0]}
      />
    </>
  );
};

export default GenresViewMenu;
