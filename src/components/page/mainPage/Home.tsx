import React, { useState } from 'react';
import styled from 'styled-components';
import NoteView from './NoteView';
import Header from './Header';
import Drawer from '../../util/Drawer';
import GenreView from './GenreView';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
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
      <Drawer
        width="30"
        mobileWidth="80"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <GenreView
          onGenreSelect={(genreId: string) => {
            setSelectedGenreId(genreId);
          }}
          selectedGenreId={selectedGenreId}
        />
      </Drawer>
      <RightNoteView selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
