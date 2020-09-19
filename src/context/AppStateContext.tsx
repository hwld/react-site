import * as React from 'react';
import { useContext } from 'react';
import {
  AppStateService,
  defaultAppStateService,
} from '../services/useAppState';

const AppStateContext = React.createContext<AppStateService>(
  defaultAppStateService(),
);

export const AppStateProvider: React.FC<{ value: AppStateService }> = ({
  children,
  value,
}) => {
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
