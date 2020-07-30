import React from 'react';
import styled from 'styled-components';
import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { TooltipIconButton } from '../../ui/TooltipIconButton';

const AppTitle = styled(Typography)`
  font-weight: bold;
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

type AppHeaderProps = {
  onMenuClick: () => void;
  onLogout: () => Promise<void>;
  menuItems: React.ReactNode;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuClick,
  onLogout,
  menuItems,
}) => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <IconButton edge="start" data-testid="menuButton" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h5">Notes</AppTitle>
        {menuItems}
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
