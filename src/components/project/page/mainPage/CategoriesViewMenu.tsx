import React from 'react';
import { AddGenreDialog } from '../../operation/AddCategoryDialog';
import { RemoveGenreDialog } from '../../operation/RemoveCategoryDIalog';
import { UpdateGenreDialog } from '../../operation/UpdateCategoryDialog';

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
        parentGenreId={selectedGenreIds[0] || ''}
      />
      <RemoveGenreDialog
        disabled={selectedGenreIds.length === 0}
        targetGenreIds={selectedGenreIds}
      />
      <UpdateGenreDialog
        disabled={selectedGenreIds.length !== 1}
        defaultGenreId={selectedGenreIds[0] || ''}
      />
    </>
  );
};

export { GenresViewMenu };
