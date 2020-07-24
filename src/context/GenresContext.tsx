import * as React from 'react';
import { useContext } from 'react';
import { Genre, GenreField } from '../services/genres';

type GenresContextValue = {
  genres: Genre[];
  addGenre: (parentGenreId: string, genreField: GenreField) => void;
  removeGenres: (id: string[]) => Promise<void>;
  updateGenre: (genre: GenreField & { id: string }) => void;
  moveGenres: (genreId: string[], destGenreId: string) => Promise<void>;
};

export const genresContextDefaultValue: GenresContextValue = {
  genres: [],

  addGenre: () => {},
  removeGenres: () => Promise.resolve(),
  updateGenre: () => {},
  moveGenres: () => Promise.resolve(),
};

const GenresContext = React.createContext<GenresContextValue>(
  genresContextDefaultValue,
);

export const GenresContextProvider: React.FC<{ value: GenresContextValue }> = ({
  children,
  value,
}) => {
  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
};

export const useGenresContext = () => useContext(GenresContext);
