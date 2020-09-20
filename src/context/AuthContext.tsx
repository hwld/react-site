import * as React from 'react';
import { useContext } from 'react';
import { AuthService } from '../services/useAuthService';

const AuthContext = React.createContext<AuthService>({
  user: { userId: '', isAnonymous: false },
  authState: { loading: false },
  googleLogin: () => Promise.resolve(),
  anonymousLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  linkWithGoogle: () => Promise.resolve(),
  deleteAccount: () => {},
});

export const AuthContextProvider: React.FC<{
  value: AuthService;
}> = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
