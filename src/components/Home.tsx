import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { setUserUid } from 'stores/user';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import GenreTreeView, { Genre } from 'components/GenreTreeView';

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

const genres: Genre[] = [
  { genreName: 'genre1', id: '1', parentGenreId: null, childrenGenreIds: [] },
  {
    genreName: 'genre2',
    id: '2',
    parentGenreId: null,
    childrenGenreIds: ['3', '5'],
  },
  {
    genreName: 'genre2-1',
    id: '3',
    parentGenreId: '2',
    childrenGenreIds: ['4'],
  },
  {
    genreName: 'genre2-2',
    id: '5',
    parentGenreId: '2',
    childrenGenreIds: [],
  },
  {
    genreName: 'genre2-1-1',
    id: '4',
    parentGenreId: '3',
    childrenGenreIds: [],
  },
];

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
        <GenreTreeView genres={genres} />
      </Drawer>
      <Main>
        <Toolbar />
        <Typography>Hello</Typography>
      </Main>
    </Background>
  );
};

export default Home;
