import * as React from 'react';
import { useContext } from 'react';
import {
  AppStateService,
  getDefaultAppStateService,
} from '../services/appState';

const AppStateContext = React.createContext<AppStateService>(
  getDefaultAppStateService(),
);

export const AppStateProvider: React.FC<{
  value: Partial<AppStateService>;
}> = ({ children, value }) => {
  return (
    <AppStateContext.Provider
      value={{ ...getDefaultAppStateService(), ...value }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => useContext(AppStateContext);
