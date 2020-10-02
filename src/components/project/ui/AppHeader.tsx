import React from 'react';
import styled from 'styled-components';
import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { TooltipIconButton } from '../../ui/TooltipIconButton';
import { AccountLinkMenu } from './AccountLinkMenu';
import { AccountSettingMenu } from './AccountSettingMenu';
import { useAuthContext } from '../../../context/AuthContext';
import { useAppStateContext } from '../../../context/AppStateContext';

const AppTitle = styled(Typography)`
  font-weight: bold;
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

type AppHeaderProps = {
  title: string;
  onMenuClick: () => void;
  menuItems: React.ReactNode;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onMenuClick,
  menuItems,
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
    <AppBar position="absolute">
      <Toolbar>
        <IconButton edge="start" data-testid="menuButton" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h5">{title}</AppTitle>
        {menuItems}
        {user.isAnonymous && <AccountLinkMenu />}
        {!user.isAnonymous && <AccountSettingMenu />}
        <TooltipIconButton
          tooltipText="ログアウト"
          icon={<ExitToApp />}
          onClick={logoutAndDelete}
        />
      </Toolbar>
    </AppBar>
  );
};

export { AppHeader };
