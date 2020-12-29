import React, { useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import SearchNoteIcon from '@material-ui/icons/Search';
import { NotesView } from './NotesView';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { CategoriesView } from './CategoriesView';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { useOpener } from '../../../../util/hooks/useOpener';
import { IconButton } from '../../../ui/IconButton';
import { AppHeader } from '../../ui/AppHeader';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  const { isOpen, open, close, invert } = useOpener(true);
  const categoriesViewRef = useRef<HTMLUListElement | null>(null);
  const notesViewRef = useRef<HTMLUListElement | null>(null);
  const history = useHistory();
  const {
    isMobile,
    selectedCategoryIds,
    setSelectedCategoryIds,
  } = useAppStateContext();

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
    <div className={className} data-testid="mainPage">
      <AppHeader title="Notes" onMenuClick={invert}>
        <IconButton tooltipText="検索モードに移動" onClick={goSearchMode}>
          <SearchNoteIcon />
        </IconButton>
      </AppHeader>

      <Drawer
        width={isMobile ? '80' : '40'}
        isPresistent={!isMobile}
        open={isOpen}
        onOpen={open}
        onClose={close}
      >
        <CategoriesView
          onCategorySelect={setSelectedCategoryIds}
          selectedCategoryIds={selectedCategoryIds}
          onKeyDown={handleCategoriesViewKeyDown}
          ref={categoriesViewRef}
        />
      </Drawer>
      <NotesView
        selectedCategoryIds={selectedCategoryIds}
        onKeyDown={handleNotesViewKeyDown}
        ref={notesViewRef}
      />
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

export const MainHome = StyledComponent;
