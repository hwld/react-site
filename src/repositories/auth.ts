import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useMemo } from 'react';
import { auth } from './firebaseConfig';

export type AppUser = {
  userId: string;
  isAnonymous: boolean;
};

export type AuthState = {
  loading: boolean;
};

const useAuth = () => {
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
    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      window.console.log(error);
      throw new Error(error);
    }
  }, []);

  const anonymousLogin = useCallback(async () => {
    try {
      await auth.signInAnonymously();
    } catch (error) {
      window.console.log(error);
      throw new Error(error);
    }
  }, []);

  const logout = useCallback(async () => {
    if (user.isAnonymous && firebaseUser) {
      await firebaseUser.delete();
    }

    return auth.signOut();
  }, [firebaseUser, user.isAnonymous]);

  const linkWithGoogle = useCallback(() => {
    if (!firebaseUser) return;
    firebaseUser.linkWithPopup(new firebase.auth.GoogleAuthProvider());
  }, [firebaseUser]);

  return {
    user,
    authState,
    googleLogin,
    anonymousLogin,
    logout,
    linkWithGoogle,
  };
};

export { useAuth };
