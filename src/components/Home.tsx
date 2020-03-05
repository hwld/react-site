import React, { useState } from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import styled from 'styled-components';
import GenreTreeView, { Genre } from 'components/GenreTreeList';
import NotesView from 'components/NotesView';
import NoteAppBar from 'components/NoteAppBar';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
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
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  return (
    <Background>
      <NoteAppBar onMenuClick={() => setIsOpen(state => !state)} />
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
      <NotesView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
