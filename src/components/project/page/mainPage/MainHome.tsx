import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { NotesView } from './NotesView';
import { MainHeader } from './MainHeader';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { CategoriesView } from './CategoriesView';
import { useAppStateContext } from '../../../../context/AppStateContext';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const StyledDrawer = styled(Drawer)`
  &:focus-within {
    outline: ${props => props.theme.palette.secondary.main} solid 1px;
  }
`;

const MainHome: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const categoriesViewRef = useRef<HTMLUListElement | null>(null);
  const notesViewRef = useRef<HTMLUListElement | null>(null);
  const history = useHistory();
  const {
    isMobile,
    selectedCategoryIds,
    setSelectedCategoryIds,
  } = useAppStateContext();

  const invertDrawer = () => {
    setIsOpen(state => !state);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const goSearchMode = () => {
    history.replace('/search');
  };

  const handleCategoriesViewKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement>,
  ) => {
    switch (event.key) {
      case 'ArrowRight': {
        if (notesViewRef.current) {
          notesViewRef.current.focus();
        }
        break;
      }
      default:
        break;
    }
  };

  const handleNotesViewKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement>,
  ) => {
    switch (event.key) {
      case 'ArrowLeft': {
        if (categoriesViewRef.current) {
          categoriesViewRef.current.focus();
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <Background data-testid="mainPage">
      <MainHeader onMenuClick={invertDrawer} onGoSearchMode={goSearchMode} />
      <StyledDrawer
        width={isMobile ? '80' : '40'}
        isPresistent={!isMobile}
        open={isOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
      >
        <CategoriesView
          onCategorySelect={setSelectedCategoryIds}
          selectedCategoryIds={selectedCategoryIds}
          onKeyDown={handleCategoriesViewKeyDown}
          ref={categoriesViewRef}
        />
      </StyledDrawer>
      <NotesView
        selectedCategoryIds={selectedCategoryIds}
        onKeyDown={handleNotesViewKeyDown}
        ref={notesViewRef}
      />
    </Background>
  );
};

export { MainHome };
