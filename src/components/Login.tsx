import React, { useCallback } from 'react';

import { setUserUid } from 'stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { Redirect } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';
import { login } from 'service/auth';

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
  const { uid } = useSelector((state: RootState) => state.reactNotes);

  const onLogin = useCallback(() => {
    login()
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
            onClick={onLogin}
            type="button"
            color="secondary"
            variant="contained"
          >
            <Typography color="textPrimary">ログイン</Typography>
          </LoginButton>
        </LoginForm>
      )}
    </Background>
  );
};

export default Login;
