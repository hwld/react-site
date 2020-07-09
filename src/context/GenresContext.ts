import * as React from 'react';
import { Genre } from '../services/genres';

type GenresContextValue = {
  genres: Genre[];
  addGenre: (genre: Genre) => void;
  removeGenre: (id: string) => void;
  updateGenre: (genre: Genre) => void;
  moveGenre: (genre: Genre, destGenreId: string) => void;
};

export const genresContextDefaultValue: GenresContextValue = {
  genres: [],

  addGenre: () => {},
  removeGenre: () => {},
  updateGenre: () => {},
  moveGenre: () => {},
};

const GenresContext = React.createContext<GenresContextValue>(
  genresContextDefaultValue,
);

export default GenresContext;
