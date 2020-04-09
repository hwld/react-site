import React, { useState } from 'react';
import styled from 'styled-components';
import NotesColumn from './NotesColumn';
import Header from './Header';
import Drawer from '../../../ui/Drawer';
import GenresColumn from './GenresColumn';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const RightNotesColumn = styled(NotesColumn)`
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
        <GenresColumn
          onGenreSelect={(genreId: string) => {
            setSelectedGenreId(genreId);
          }}
          selectedGenreId={selectedGenreId}
        />
      </Drawer>
      <RightNotesColumn selectedGenreId={selectedGenreId} />
    </Background>
  );
};

export default Home;
