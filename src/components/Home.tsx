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
import MemoList from './MemoList';
import { Memo } from './MemoListItem';

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
  flex-basis: ${props => `${props.width}px`};
  margin-left: ${props => (props.isOpen ? '0px' : `-${props.width}px`)};
  transition-duration: 0.3s;
  word-wrap: normal;
  overflow: auto;
`;

const Main = styled.div`
  height: 100%;
  flex: 5;
  word-wrap: normal;
  overflow: auto;
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

const memos: Memo[] = [
  {
    id: '1',
    genreId: '1',
    title: 'title1-1',
    text: 'text1-1text1',
    authorName: 'autho1-1',
    bookName: 'book1-1',
  },
  {
    id: '2',
    genreId: '1',
    title: 'title1-2',
    text:
      'text-2text1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1tet1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1textext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1te1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1tet1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1textext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1te1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1',
    authorName: 'autho1-2',
    bookName: 'book1-2',
  },
  {
    id: '3',
    genreId: '4',
    title: 'title4-1',
    text: 'text4-1',
    authorName: 'autho4-1',
    bookName: 'book4-1',
  },
];

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState('');
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
        <GenreTreeView
          genres={genres}
          onGenreSelect={(event: React.ChangeEvent<{}>, selectedId: string) => {
            setSelectedGenreId(selectedId);
          }}
        />
      </Drawer>
      <Main>
        <Toolbar />
        <MemoList memos={memos} selectedGenreId={selectedGenreId} />
      </Main>
    </Background>
  );
};

export default Home;
