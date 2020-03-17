import { auth } from 'firebaseConfig';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const useCurrentUser = () => {
  const [user, loading, error] = useAuthState(auth);

  return { user, loading, error };
};

const login = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

const logout = () => {
  return auth.signOut();
};

export { useCurrentUser, login, logout };
