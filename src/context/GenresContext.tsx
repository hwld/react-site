import * as React from 'react';
import { useContext } from 'react';
import {
  getDefaultGenreStoreService,
  GenreStoreService,
} from '../services/useGenreStoreService';

const GenresContext = React.createContext<GenreStoreService>(
  getDefaultGenreStoreService(),
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
