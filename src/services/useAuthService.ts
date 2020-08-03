import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useMemo } from 'react';
import { auth } from './firebaseConfig';
import { AppUser, AuthState } from '../types/auth';

export const useAuthService = () => {
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
