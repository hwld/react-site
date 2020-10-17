import React, { useCallback, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { useAuthContext } from '../../../../context/AuthContext';
import { LoginButton } from '../../ui/LoginButton';

type Props = {
  className?: string;
};

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
    <div className={className} data-testid="loginPage">
      <div className="loginForm">
        <div className="iconField">
          {loading ? (
            <CircularProgress color="secondary" size="10rem" />
          ) : (
            <LockIcon className="loginIcon" />
          )}
        </div>
        <ul className="loginButtonList">
          <li className="listItem">
            <LoginButton
              imgSrc="./google.svg"
              imgAlt="google"
              onClick={onGoogleLogin}
              message="Googleでログイン"
              data-testid="googleLoginButton"
            />
          </li>
          <li className="listItem">
            <LoginButton
              imgSrc="./anonymous.svg"
              imgAlt="anonymous"
              onClick={onAnonymousLogin}
              message="ゲストとしてログイン"
              data-testid="guestLoginButton"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.dark};
  height: 100vh;

  & > .loginForm {
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

    & > .iconField {
      display: flex;
      align-items: center;
      justify-items: center;
      height: 50%;

      & > .loginIcon {
        width: 100%;
        height: 100%;
      }
    }

    & > .loginButtonList {
      list-style: none;
      padding: 0;

      & > .listItem {
        margin-top: 30px;
      }
    }
  }
`;

export const LoginHome = StyledComponent;
