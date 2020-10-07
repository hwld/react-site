import * as React from 'react';
import { useContext } from 'react';
import { getDefaultGenreService, GenreService } from '../services/categories';

const GenresContext = React.createContext<GenreService>(
  getDefaultGenreService(),
);

export const GenresContextProvider: React.FC<{ value: GenreService }> = ({
  children,
  value,
}) => {
  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
};

export const useGenresContext = () => useContext(GenresContext);
