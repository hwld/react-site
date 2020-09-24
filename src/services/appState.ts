import { useMediaQuery, useTheme } from '@material-ui/core';
import { useCallback, useMemo, useState } from 'react';
import { getLocalStorage } from '../util/getLocalStorage';

// types
export type FirestoreAppState = {
  expandedIds: string[];
};

export type AppStateService = {
  isMobile: boolean;
  expandedIds: string[];
  selectedGenreIds: string[];
  setExpandedIds: (ids: string[]) => void;
  setSelectedGenreIds: (ids: string[]) => void;
};

// default value
export const defaultAppState = (): FirestoreAppState => ({ expandedIds: [] });

export const defaultAppStateService = (): AppStateService => ({
  isMobile: false,
  expandedIds: [],
  selectedGenreIds: [],
  setExpandedIds: () => {},
  setSelectedGenreIds: () => {},
});

// hook
export const useAppState = (): AppStateService => {
  // isMobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  // expanded
  const initExpandedIds = useMemo(() => getLocalStorage('expanded'), []);
  const [expandedIds, setInternalExpandedIds] = useState<string[]>(
    initExpandedIds,
  );

  // selected genre
  const initSelectedGenreIds = useMemo(
    () => getLocalStorage('selectedGenre'),
    [],
  );
  const [selectedGenreIds, setInternalSelectedIds] = useState<string[]>(
    initSelectedGenreIds,
  );

  // set expanded
  const setExpandedIds = useCallback((ids: string[]) => {
    localStorage.setItem('expanded', JSON.stringify(ids));
    setInternalExpandedIds(ids);
  }, []);

  // set selected genre
  const setSelectedGenreIds = useCallback((ids: string[]) => {
    localStorage.setItem('selectedGenre', JSON.stringify(ids));
    setInternalSelectedIds(ids);
  }, []);

  return {
    isMobile,
    expandedIds,
    selectedGenreIds,
    setExpandedIds,
    setSelectedGenreIds,
  };
};
