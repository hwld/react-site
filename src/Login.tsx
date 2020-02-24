import React, { useEffect, useCallback } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { setUserUid } from 'stores/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { Redirect, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.user);
  const history = useHistory();

  useEffect(() => {
    window.console.log('login effect');
    const unSubscribe = firebase.auth().onAuthStateChanged(loggedinUser => {
      if (loggedinUser) {
        dispatch(setUserUid(loggedinUser.uid));
      }
    });

    return () => {
      unSubscribe();
      window.console.log('login effect unsubscribe');
    };
  }, [dispatch]);

  const login = useCallback(() => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if (result.user) {
          dispatch(setUserUid(result.user.uid));
          history.replace('/home');
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  }, [dispatch, history]);

  return (
    <div>
      {uid ? (
        <Redirect to="/home" />
      ) : (
        <button type="button" onClick={login}>
          ログイン
        </button>
      )}
    </div>
  );
};

export default Login;
