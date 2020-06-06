import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';
import { login, useCurrentUserId } from '../../../../services/auth';

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

  /* props => props... の ">" がstylelintに引っかかる */
  /* stylelint-disable-next-line selector-combinator-space-before */
  ${props => props.theme.breakpoints.down('xs')} {
    width: 80%;
  }
`;

const LoginIcon = styled(LockIcon)`
  width: 50%;
  height: 50%;
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
          <input
            onClick={onLogin}
            type="image"
            src="./btn_google_signin_dark_normal_web.png"
            alt="Googleでログイン"
          />
        </LoginForm>
      )}
    </Background>
  );
};

export default Login;
