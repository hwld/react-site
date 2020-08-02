import * as React from 'react';
import { useContext } from 'react';

export type GenreField = {
  genreName: string;
};

export type GenreDate = {
  createdAt: Date;
};

export type GenreInfo = {
  id: string;
  parentGenreId: string;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
};

export type Genre = GenreField & GenreDate & GenreInfo;

type GenresService = {
  genres: Genre[];
  addGenre: (parentGenreId: string, genreField: GenreField) => void;
  removeGenres: (id: string[]) => void;
  updateGenre: (genre: GenreField & { id: string }) => void;
  moveGenres: (genreId: string[], destGenreId: string) => void;
};

const GenresContext = React.createContext<GenresService>({
  genres: [],

  addGenre: () => {},
  removeGenres: () => {},
  updateGenre: () => {},
  moveGenres: () => {},
});

export const GenresContextProvider: React.FC<{ value: GenresService }> = ({
  children,
  value,
}) => {
  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
};

export const useGenresContext = () => useContext(GenresContext);
