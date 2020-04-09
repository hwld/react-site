import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';
import { login, useCurrentUserId } from '../../../services/auth';

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
  width: '30%';

  /* props => props... の ">" がstylelintに引っかかる */
  /* stylelint-disable-next-line selector-combinator-space-before */
  ${props => props.theme.breakpoints.down('xs')} {
    width: '80%';
  }
`;

const LoginIcon = styled(LockIcon)`
  width: 50%;
  height: 50%;
`;

const LoginButton = styled(Button)`
  width: 70%;
`;

const Login: React.FC = () => {
  const { userId } = useCurrentUserId();

  const onLogin = useCallback(() => {
    login().catch(error => {
      window.console.log(error);
    });
  }, []);

  return (
    <Background>
      {userId !== '' ? (
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
            <Typography color="textSecondary">ログイン</Typography>
          </LoginButton>
        </LoginForm>
      )}
    </Background>
  );
};

export default Login;
