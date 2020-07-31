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
  const [fUser, loading] = useAuthState(auth);
  const user: AppUser = useMemo(
    () => ({
      userId: fUser ? fUser.uid : '',
      isAnonymous: fUser ? fUser.isAnonymous : false,
    }),
    [fUser],
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

  const logout = useCallback(() => {
    return auth.signOut();
  }, []);

  return { user, authState, googleLogin, anonymousLogin, logout };
};

export { useAuth };
