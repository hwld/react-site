import React, { useMemo, useState, useEffect } from 'react';
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
  const [removeTargetGenreIds, setRemoveTargetGenreids] = useState(
    selectedGenreIds,
  );

  const selectedGenres = genres.filter(genre =>
    selectedGenreIds.includes(genre.id),
  );

  // 親子関係にあるジャンルを削除しようとしたときに、子を削除対象から外す
  useEffect(() => {
    const getChildrenGenres = (id: string): string[] => {
      const children = genres
        .filter(genre => genre.id === id)
        .flatMap(genre => genre.childrenGenreIds);

      const grandChild = children.flatMap(childId =>
        getChildrenGenres(childId),
      );

      return [...children, ...grandChild];
    };
    const allChildren = Array.from(
      new Set(selectedGenreIds.flatMap(id => getChildrenGenres(id))),
    );

    setRemoveTargetGenreids(
      selectedGenreIds.filter(id => !allChildren.includes(id)),
    );
  }, [genres, selectedGenreIds]);

  return (
    <>
      <AddGenreDialog
        disabled={selectedGenreIds.length > 1}
        parentGenreId={selectedGenreIds[0]}
      />
      <RemoveGenreDialog
        disabled={selectedGenreIds.length === 0}
        targetGenreIds={removeTargetGenreIds}
      />
      <UpdateGenreDialog
        disabled={selectedGenres.length !== 1}
        defaultGenre={selectedGenres[0] || createDefaultGenre()}
      />
    </>
  );
};

export default GenreViewMenu;
