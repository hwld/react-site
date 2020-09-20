import { useMediaQuery, useTheme } from '@material-ui/core';
import { useCallback, useMemo } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from './firebaseConfig';

// types
export type FirestoreAppState = {
  expandedIds: string[];
};

export type AppStateService = {
  isMobile: boolean;
  expandedIds: string[];
  storeExpandedIds: (ids: string[]) => void;
};

// default value
export const defaultAppState = (): FirestoreAppState => ({ expandedIds: [] });

export const defaultAppStateService = (): AppStateService => ({
  isMobile: false,
  expandedIds: [],
  storeExpandedIds: () => {},
});

// hook
export const useAppState = (uid: string): AppStateService => {
  const appStateRef = useMemo(() => {
    return db.collection('users').doc(`${uid !== '' ? uid : 'tmp'}`);
  }, [uid]);
  const [appState] = useDocumentData<FirestoreAppState>(appStateRef);
  const expandedIds = appState ? appState.expandedIds : [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const storeExpandedIds = useCallback(
    (ids: string[]) => {
      appStateRef.set({ expandedIds: ids });
    },
    [appStateRef],
  );

  return {
    expandedIds,
    isMobile,
    storeExpandedIds,
  };
};
