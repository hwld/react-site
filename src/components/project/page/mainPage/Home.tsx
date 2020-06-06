import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTheme, useMediaQuery } from '@material-ui/core';
import NotesView from './NotesView';
import Header from './Header';
import Drawer from '../../../ui/Drawer/Drawer';
import GenresView from './GenresView';
import MobileContext from '../../../../context/MobileContext';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const RightNotesView = styled(NotesView)`
  flex: 1;
`;

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleGenreSelect = useCallback((id: string[]) => {
    setSelectedGenreIds(id);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      <Background>
        <Header onMenuClick={() => setIsOpen(state => !state)} />
        <Drawer
          width={isMobile ? '80' : '30'}
          isPresistent={!isMobile}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          <GenresView
            onGenreSelect={handleGenreSelect}
            selectedGenreIds={selectedGenreIds}
          />
        </Drawer>
        <RightNotesView selectedGenreIds={selectedGenreIds} />
      </Background>
    </MobileContext.Provider>
  );
};

export default Home;
