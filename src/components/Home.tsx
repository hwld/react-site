import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import MenuIcon from '@material-ui/icons/Menu';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { setUserUid } from 'stores/user';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const StyledAppBar = styled(AppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const Drawer = styled.div<{ width: string; isOpen: boolean }>`
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  width: ${props => `${props.width}px`};
  margin-left: ${props => (props.isOpen ? '0px' : `-${props.width}px`)};
  transition-duration: 0.3s;
  word-wrap: normal;
  overflow: auto;
`;

const Main = styled.div`
  flex-grow: 5;
`;

const data = {
  name: 'root',
  toggled: true,
  children: [{ name: 'Node1' }, { name: 'Node2' }],
};

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    firebase.auth().signOut();
    dispatch(setUserUid(null));
    history.replace('/login');
  };

  return (
    <Background>
      <StyledAppBar position="absolute">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setIsOpen(state => !state)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">Notes</Typography>
        </Toolbar>
      </StyledAppBar>
      <Drawer width="500" isOpen={isOpen}>
        <Toolbar />
        <Divider />
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon color="secondary" />}
          defaultExpandIcon={<ChevronRightIcon color="secondary" />}
        >
          <TreeItem nodeId="1" label="Node1">
            <TreeItem nodeId="2" label="Node1-1">
              <TreeItem nodeId="3" label="Node-1-1-1" />
            </TreeItem>
          </TreeItem>
        </TreeView>
      </Drawer>
      <Main>
        <Toolbar />
        <Typography>Hello</Typography>
      </Main>
    </Background>
  );
};

export default Home;
