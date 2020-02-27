import React, { useEffect, useCallback } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { setUserUid } from 'stores/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { Redirect } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.dark};
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.main};
  height: 80%;
  width: 30%;
`;

const LoginIcon = styled(LockIcon)`
  width: 50%;
  height: 50%;
`;

const LoginButton = styled(Button)`
  width: 70%;
`;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unSubscribe = firebase.auth().onAuthStateChanged(loggedinUser => {
      window.console.log('login onAuthStateChanged');
      if (loggedinUser) {
        dispatch(setUserUid(loggedinUser.uid));
      }
    });

    return unSubscribe;
  }, [dispatch]);

  const login = useCallback(() => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if (result.user) {
          dispatch(setUserUid(result.user.uid));
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  }, [dispatch]);

  return (
    <Background>
      {uid ? (
        <Redirect to="/home" />
      ) : (
        <LoginForm>
          <LoginIcon />
          <LoginButton
            onClick={login}
            type="button"
            color="secondary"
            variant="outlined"
          >
            <Typography color="secondary">ログイン</Typography>
          </LoginButton>
        </LoginForm>
      )}
    </Background>
  );
};

export default Login;
