import React, { useState } from 'react';
import styled from 'styled-components';
import NoteView from 'components/Page/mainPage/NoteView';
import Header from 'components/Page/mainPage/Header';
import GenreView from './GenreView';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const LeftDrawer = styled.div<{ isOpen: boolean }>`
  background-color: ${props => props.theme.palette.primary.main};
  flex-basis: 30vw;
  margin-left: ${props => (props.isOpen ? '0px' : '-30vw')};
  transition-duration: 0.3s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const RightNoteView = styled(NoteView)`
  flex: 1;
`;

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  return (
    <Background>
      <Header onMenuClick={() => setIsOpen(state => !state)} />
      <LeftDrawer isOpen={isOpen}>
        <GenreView
          onGenreSelect={(genreId: string) => {
            setSelectedGenreId(genreId);
          }}
          selectedGenreId={selectedGenreId}
        />
      </LeftDrawer>
      <RightNoteView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
