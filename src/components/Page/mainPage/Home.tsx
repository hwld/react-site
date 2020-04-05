import React, { useState } from 'react';
import styled from 'styled-components';
import NoteView from 'components/Page/mainPage/NoteView';
import AppBar from 'components/Page/mainPage/Header';
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
  overflow: auto;
`;

const StyledGenreView = styled(GenreView)`
  flex: 1;
`;

const StyledNoteView = styled(NoteView)`
  flex: 1;
`;

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  return (
    <Background>
      <AppBar onMenuClick={() => setIsOpen(state => !state)} />
      <Drawer width="500" isOpen={isOpen}>
        <StyledGenreView
          onGenreSelect={(genreId: string) => {
            setSelectedGenreId(genreId);
          }}
          selectedGenreId={selectedGenreId}
        />
      </Drawer>
      <StyledNoteView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
