import React from 'react';
import styled from 'styled-components';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '../../ui/IconButton';
import { AccountLinkMenu } from '../ui/AccountLinkMenu';
import { AccountSettingMenu } from '../ui/AccountSettingMenu';
import { useAuthContext } from '../../../context/AuthContext';
import { useAppStateContext } from '../../../context/AppStateContext';

type Props = {
  className?: string;
  title: string;
  onMenuClick: () => void;
};

const Component: React.FC<Props> = ({
  className,
  title,
  onMenuClick,
  children,
}) => {
  const { user, logout, deleteAccount } = useAuthContext();
  const { clearAppState } = useAppStateContext();

  const logoutAndDelete = () => {
    if (user.isAnonymous) {
      deleteAccount();
    }
    clearAppState();
    logout();
  };

  return (
    <AppBar position="absolute" className={className}>
      <Toolbar>
        <IconButton edge="start" aria-label="menuButton" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography className="appTitle" variant="h5">
          {title}
        </Typography>
        {children}
        {user.isAnonymous && <AccountLinkMenu />}
        {!user.isAnonymous && <AccountSettingMenu />}
        <IconButton tooltipText="ログアウト" onClick={logoutAndDelete}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const StyledComponent = styled(Component)`
  & .appTitle {
    font-weight: bold;
    color: ${props => props.theme.palette.text.secondary};
    flex-grow: 1;
  }
`;

export const PageHeader = StyledComponent;
