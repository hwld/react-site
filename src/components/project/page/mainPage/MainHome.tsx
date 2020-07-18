import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NotesView from './NotesView';
import MainHeader from './MainHeader';
import Drawer from '../../../ui/Drawer/Drawer';
import GenresView from './GenresView';
import { MobileContextProvider } from '../../../../context/MobileContext';
import { logout } from '../../../../services/auth';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const MainHome: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const goSearchMode = () => {
    history.replace('/search');
  };

  return (
    <MobileContextProvider value={{ isMobile }}>
      <Background data-testid="mainPage">
        <MainHeader
          onMenuClick={() => setIsOpen(state => !state)}
          onGoSearchMode={goSearchMode}
          onLogout={logout}
        />
        <Drawer
          width={isMobile ? '80' : '30'}
          isPresistent={!isMobile}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          <GenresView
            onGenreSelect={setSelectedGenreIds}
            selectedGenreIds={selectedGenreIds}
          />
        </Drawer>
        <NotesView selectedGenreIds={selectedGenreIds} />
      </Background>
    </MobileContextProvider>
  );
};

export default MainHome;
