import * as React from 'react';
import { useContext } from 'react';
import { AuthService, getDefaultAuthService } from '../services/auth';

const AuthContext = React.createContext<AuthService>(getDefaultAuthService());

export const AuthContextProvider: React.FC<{
  value: Partial<AuthService>;
}> = ({ children, value }) => {
  return (
    <AuthContext.Provider value={{ ...getDefaultAuthService(), ...value }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
