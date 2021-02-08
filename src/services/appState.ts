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
  selectedCategoryIds: string[];
  setExpandedIds: (ids: string[]) => void;
  setSelectedCategoryIds: (ids: string[]) => void;
  clearAppState: () => void;
};

// default value
export const defaultAppState = (): FirestoreAppState => ({ expandedIds: [] });

export const getDefaultAppStateService = (): AppStateService => ({
  isMobile: false,
  expandedIds: [],
  selectedCategoryIds: [],
  setExpandedIds: () => {},
  setSelectedCategoryIds: () => {},
  clearAppState: () => {},
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

  // selected category
  const initSelectedCategoryIds = useMemo(
    () => getLocalStorage('selectedCategory'),
    [],
  );
  const [selectedCategoryIds, setInternalSelectedIds] = useState<string[]>(
    initSelectedCategoryIds,
  );

  // set expanded
  const setExpandedIds = useCallback((ids: string[]) => {
    localStorage.setItem('expanded', JSON.stringify(ids));
    setInternalExpandedIds(ids);
  }, []);

  // set selected category
  const setSelectedCategoryIds = useCallback((ids: string[]) => {
    localStorage.setItem('selectedCategory', JSON.stringify(ids));
    setInternalSelectedIds(ids);
  }, []);

  const clearAppState = useCallback(() => {
    localStorage.removeItem('expanded');
    localStorage.removeItem('selectedCategory');
    setInternalExpandedIds([]);
    setInternalSelectedIds([]);
  }, []);

  return {
    isMobile,
    expandedIds,
    selectedCategoryIds,
    setExpandedIds,
    setSelectedCategoryIds,
    clearAppState,
  };
};
