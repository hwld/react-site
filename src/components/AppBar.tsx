import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { logout } from 'services/auth';

interface NoteAppBarProps {
  onMenuClick: () => void;
}

const StyledAppBar = styled(AppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const AppTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

const NoteAppBar: React.FC<NoteAppBarProps> = ({ onMenuClick }) => {
  const history = useHistory();

  const onLogout = () => {
    logout();
    history.replace('/home');
  };

  return (
    <StyledAppBar position="absolute">
      <Toolbar>
        <IconButton edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h4">Notes</AppTitle>
        <IconButton onClick={onLogout}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NoteAppBar;
