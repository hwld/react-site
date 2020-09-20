import * as React from 'react';
import { useContext } from 'react';
import { AuthService, defaultAuthService } from '../services/useAuthService';

const AuthContext = React.createContext<AuthService>(defaultAuthService());

export const AuthContextProvider: React.FC<{
  value: AuthService;
}> = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
