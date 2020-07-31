import React, { useCallback, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { GoogleLoginButton } from './GoogleLoginButton';
import { GuestLoginButton } from './GuestLoginButton';
import { useAuthContext } from '../../../../context/AuthContext';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.dark};
  height: 100vh;
`;

const LoginForm = styled.div`
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.main};
  height: 80%;
  width: 30%;

  /* props => props... の ">" がstylelintに引っかかる */
  /* stylelint-disable-next-line selector-combinator-space-before */
  ${props => props.theme.breakpoints.down('sm')} {
    width: 80%;
  }
`;

const IconField = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  height: 50%;
`;

const LoginIcon = styled(LockIcon)`
  width: 100%;
  height: 100%;
`;

const LoginButtonList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-top: 30px;
`;

const Login: React.FC = () => {
  const { googleLogin, anonymousLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onGoogleLogin = useCallback(() => {
    setLoading(true);
    googleLogin().catch(() => {
      setLoading(false);
    });
  }, [googleLogin]);

  const onAnonymousLogin = useCallback(() => {
    setLoading(true);
    anonymousLogin().catch(() => {
      setLoading(false);
    });
  }, [anonymousLogin]);

  return (
    <Background data-testid="loginPage">
      <LoginForm>
        <IconField>
          {loading ? (
            <CircularProgress color="secondary" size="10rem" />
          ) : (
            <LoginIcon />
          )}
        </IconField>
        <LoginButtonList>
          <ListItem>
            <GoogleLoginButton onLogin={onGoogleLogin} />
          </ListItem>
          <ListItem>
            <GuestLoginButton onLogin={onAnonymousLogin} />
          </ListItem>
        </LoginButtonList>
      </LoginForm>
    </Background>
  );
};

export { Login };
