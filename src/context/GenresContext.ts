import * as React from 'react';
import { Genre } from 'services/genres';

type GenresContextValue = {
  genres: Genre[];
  addGenre: (genre: Genre) => void;
  removeGenre: (id: string) => Promise<void>;
  updateGenre: (genre: Genre) => void;
};

const GenresContext = React.createContext<GenresContextValue>({
  genres: [],

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addGenre: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeGenre: () => new Promise(resolve => resolve()),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateGenre: () => {},
});

export default GenresContext;
