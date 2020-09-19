import { useCallback, useMemo, useRef } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from './firebaseConfig';

export type AppState = {
  expandedIds: string[];
};

export type AppStateService = {
  appState: AppState;
  writeAppStateBuffer: (appState: AppState) => void;
  storeAppState: () => void;
};

export const defaultAppState = (): AppState => ({ expandedIds: [] });

export const defaultAppStateService = (): AppStateService => {
  return {
    appState: { expandedIds: [] },
    writeAppStateBuffer: () => {},
    storeAppState: () => {},
  };
};

export const useAppState = (uid: string): AppStateService => {
  // 開閉ごとにリクエストを飛ばしたくないので、bufferにためてstoreAppState関数で実際にリクエストを飛ばす
  const appStateBuffer = useRef<AppState>(defaultAppState());
  const appStateRef = useMemo(() => {
    return db.collection('users').doc(`${uid !== '' ? uid : 'tmp'}`);
  }, [uid]);
  const [appState] = useDocumentData<AppState>(appStateRef);

  const writeAppStateBuffer = (newAppState: AppState) => {
    appStateBuffer.current = newAppState;
  };

  const storeAppState = useCallback(() => {
    appStateRef.set(appStateBuffer.current);
  }, [appStateRef]);

  return {
    appState: appState || defaultAppState(),
    writeAppStateBuffer,
    storeAppState,
  };
};
