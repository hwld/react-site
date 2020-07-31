import React from 'react';
import styled from 'styled-components';
import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { TooltipIconButton } from '../../ui/TooltipIconButton';
import { AccountLinkMenu } from './AccountLinkMenu';

const AppTitle = styled(Typography)`
  font-weight: bold;
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

type AppHeaderProps = {
  title: string;
  onMenuClick: () => void;
  onLogout: () => Promise<void>;
  menuItems: React.ReactNode;
  isAnonymous: boolean;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onMenuClick,
  onLogout,
  menuItems,
  isAnonymous,
}) => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton edge="start" data-testid="menuButton" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h5">{title}</AppTitle>
        {menuItems}
        {isAnonymous && <AccountLinkMenu />}
        <TooltipIconButton
          tooltipText="ログアウト"
          icon={<ExitToApp />}
          onClick={onLogout}
        />
      </Toolbar>
    </AppBar>
  );
};

export { AppHeader };
