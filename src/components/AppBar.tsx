import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserUid } from 'stores/user';
import * as firebase from 'firebase/app';
import 'firebase/auth';

interface NoteAppBarProps {
  onMenuClick: () => void;
}

const StyledAppBar = styled(AppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const AppTitle = styled(Typography)`
  flex-grow: 1;
`;

const NoteAppBar: React.FC<NoteAppBarProps> = ({ onMenuClick }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    firebase.auth().signOut();
    dispatch(setUserUid(null));
    history.replace('/login');
  };

  return (
    <StyledAppBar position="absolute">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h4">Notes</AppTitle>
        <IconButton onClick={logout} color="inherit">
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NoteAppBar;
