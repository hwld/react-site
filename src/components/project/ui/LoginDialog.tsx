import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';
import { useAuthContext } from '../../../context/AuthContext';
import { LoginButton } from './LoginButton';

type Props = { className?: string };

const Component: React.FC<Props> = ({ className }) => {
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
    <Dialog className={className} open>
      <DialogTitle>
        <Typography>ログイン</Typography>
      </DialogTitle>
      <DialogContent>
        <div className={`${className}_iconField`}>
          {loading ? (
            <CircularProgress color="secondary" size="10rem" />
          ) : (
            <LockIcon color="secondary" className="loginIcon" />
          )}
        </div>
        <ul className={`${className}_loginButtonList`}>
          <LoginButton
            className="loginButton"
            imgSrc="./google.svg"
            imgAlt="googleLoginButton"
            onClick={onGoogleLogin}
          >
            Googleでログイン
          </LoginButton>
          <LoginButton
            className="loginButton"
            imgSrc="./anonymous.svg"
            imgAlt="anonymousLoginButton"
            onClick={onAnonymousLogin}
          >
            ゲストとしてログイン
          </LoginButton>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

const StyledComponent = styled(Component)`
  z-index: 1301 !important;

  &_iconField {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 300px;

    & > .loginIcon {
      width: 100%;
      height: 100%;
    }
  }

  &_loginButtonList {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;

    & > .loginButton {
      margin-top: 30px;
    }
  }
`;

export const LoginDialog = StyledComponent;
