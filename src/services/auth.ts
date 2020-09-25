import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useMemo } from 'react';
import { auth, firebase } from './firebaseConfig';

// types
export type AppUser = {
  userId: string;
  isAnonymous: boolean;
};

export type AuthState = {
  loading: boolean;
};

export type AuthService = {
  user: AppUser;
  authState: AuthState;
  googleLogin: () => Promise<void>;
  anonymousLogin: () => Promise<void>;
  logout: () => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  deleteAccount: () => void;
};

// default value
export const defaultAuthService = (): AuthService => {
  return {
    user: { userId: '', isAnonymous: false },
    authState: { loading: false },
    googleLogin: () => Promise.resolve(),
    anonymousLogin: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    linkWithGoogle: () => Promise.resolve(),
    deleteAccount: () => {},
  };
};

// hook
export const useAuth = (): AuthService => {
  const [firebaseUser, loading] = useAuthState(auth);
  const user: AppUser = useMemo(
    () => ({
      userId: firebaseUser ? firebaseUser.uid : '',
      isAnonymous: firebaseUser ? firebaseUser.isAnonymous : false,
    }),
    [firebaseUser],
  );
  const authState: AuthState = useMemo(() => ({ loading }), [loading]);

  const googleLogin = useCallback(async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }, []);

  const anonymousLogin = useCallback(async () => {
    await auth.signInAnonymously();
  }, []);

  const logout = useCallback(async () => {
    return auth.signOut();
  }, []);

  const linkWithGoogle = useCallback(async () => {
    if (!firebaseUser) return;

    const userCredential = await firebaseUser.linkWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );
    logout();

    if (!userCredential.credential) return;
    auth.signInWithCredential(userCredential.credential);
  }, [firebaseUser, logout]);

  const deleteAccount = useCallback(async () => {
    if (firebaseUser) {
      await firebaseUser.delete();
    }
  }, [firebaseUser]);

  return {
    user,
    authState,
    googleLogin,
    anonymousLogin,
    logout,
    linkWithGoogle,
    deleteAccount,
  };
};
