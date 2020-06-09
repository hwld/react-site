import * as React from 'react';
import { Genre } from '../services/genres';

type GenresContextValue = {
  genres: Genre[];
  addGenre: (genre: Genre) => void;
  removeGenre: (id: string) => Promise<void>;
  updateGenre: (genre: Genre) => void;
  moveGenre: (genre: Genre, destGenreId: string) => void;
};

const GenresContext = React.createContext<GenresContextValue>({
  genres: [],

  addGenre: () => {},
  removeGenre: () => new Promise(resolve => resolve()),
  updateGenre: () => {},
  moveGenre: () => {},
});

export default GenresContext;
