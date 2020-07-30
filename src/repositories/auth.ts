import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const useCurrentUserId = () => {
  const [user, loading, error] = useAuthState(auth);
  const userId = user ? user.uid : '';

  return { userId, loading, error };
};

const googleLogin = async () => {
  try {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } catch (error) {
    window.console.log(error);
  }
};

const anonymousLogin = async () => {
  try {
    await auth.signInAnonymously();
  } catch (error) {
    window.console.log(error);
  }
};

const logout = () => {
  return auth.signOut();
};

export { useCurrentUserId, googleLogin, anonymousLogin, logout };
