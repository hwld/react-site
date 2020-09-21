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
  setExpandedIds: (ids: string[]) => void;
};

// default value
export const defaultAppState = (): FirestoreAppState => ({ expandedIds: [] });

export const defaultAppStateService = (): AppStateService => ({
  isMobile: false,
  expandedIds: [],
  setExpandedIds: () => {},
});

// hook
export const useAppState = (): AppStateService => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  // expanded
  const initExpandedIds = useMemo(() => getLocalStorage('expanded'), []);
  const [expandedIds, setInternalExpandedIds] = useState<string[]>(
    initExpandedIds,
  );

  const setExpandedIds = useCallback((ids: string[]) => {
    localStorage.setItem('expanded', JSON.stringify(ids));
    setInternalExpandedIds(ids);
  }, []);

  return {
    isMobile,
    expandedIds,
    setExpandedIds,
  };
};
