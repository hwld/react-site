import * as React from 'react';
import { useContext } from 'react';
import { AppUser, AuthState } from '../repositories/auth';

type AuthContextValue = {
  user: AppUser;
  authState: AuthState;
  googleLogin: () => Promise<void>;
  anonymousLogin: () => Promise<void>;
  logout: () => Promise<void>;
  linkWithGoogle: () => void;
};

export const authContextDefaultValue: AuthContextValue = {
  user: { userId: '', isAnonymous: false },
  authState: { loading: false },
  googleLogin: () => Promise.resolve(),
  anonymousLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  linkWithGoogle: () => {},
};

const AuthContext = React.createContext<AuthContextValue>(
  authContextDefaultValue,
);

export const AuthContextProvider: React.FC<{
  value: AuthContextValue;
}> = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
