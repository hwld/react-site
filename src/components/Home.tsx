import React, { useState } from 'react';
import styled from 'styled-components';
import NotesView from 'components/NotesView';
import NoteAppBar from 'components/NoteAppBar';
import GenreView from './GenreView';

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

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  return (
    <Background>
      <NoteAppBar onMenuClick={() => setIsOpen(state => !state)} />
      <Drawer width="500" isOpen={isOpen}>
        <GenreView
          onGenreSelect={(event: React.ChangeEvent<{}>, genreId: string) => {
            setSelectedGenreId(genreId);
          }}
        />
      </Drawer>
      <NotesView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
