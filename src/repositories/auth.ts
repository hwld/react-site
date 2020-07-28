import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const useCurrentUserId = () => {
  const [user, loading, error] = useAuthState(auth);
  const userId = user ? user.uid : '';

  return { userId, loading, error };
};

const login = async () => {
  const result = await auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider(),
  );
  if (result.user) {
    return result.user.uid;
  }

  return null;
};

const logout = () => {
  return auth.signOut();
};

export { useCurrentUserId, login, logout };
