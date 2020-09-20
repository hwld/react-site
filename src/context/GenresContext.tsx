import * as React from 'react';
import { useContext } from 'react';
import {
  defaultGenreStoreService,
  GenreStoreService,
} from '../services/useGenreStoreService';

const GenresContext = React.createContext<GenreStoreService>(
  defaultGenreStoreService(),
);

export const GenresContextProvider: React.FC<{ value: GenreStoreService }> = ({
  children,
  value,
}) => {
  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
};

export const useGenresContext = () => useContext(GenresContext);
