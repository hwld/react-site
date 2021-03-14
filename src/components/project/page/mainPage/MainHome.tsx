import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import SearchNoteIcon from '@material-ui/icons/Search';
import { NotesView } from './NotesView';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { CategoriesView } from './CategoriesView';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { useOpener } from '../../../../util/hooks/useOpener';
import { IconButton } from '../../../ui/IconButton';
import { PageHeader } from '../common/PageHeader';
import { AuthRequiredPage } from '../common/AuthRequiredPage';

type Props = {
  className?: string;
  isMobile: boolean;
};

const Component: React.FC<Props> = ({ className, isMobile }) => {
  const { selectedCategoryIds, setSelectedCategoryIds } = useAppStateContext();

  const history = useHistory();

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
    toggle: toggleDrawer,
  } = useOpener(true);

  const categoriesViewRef = useRef<HTMLUListElement | null>(null);
  const notesViewRef = useRef<HTMLUListElement | null>(null);

  const [focusedCategoryId, setFocusedCategoryId] = useState<string | null>(
    selectedCategoryIds[0],
  );
  const [focusedNoteId, setFocusedNoteId] = useState<string | null>(null);

  const [
    lastFocusedNoteIdByCategory,
    setLastFocusedNoteIdByCategory,
  ] = useState(new Map<string, string | null>());

  const setLastFocusedNoteId = (args: {
    categoryId: string;
    focusedNoteId: string | null;
  }) => {
    setLastFocusedNoteIdByCategory(map => {
      map.set(args.categoryId, args.focusedNoteId);

      return new Map(map);
    });
  };

  const goSearchPage = () => {
    history.replace('/search');
  };

  const handleCategoriesViewKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement>,
  ) => {
    switch (event.key) {
      case 'ArrowRight': {
        if (selectedCategoryIds.length === 0) {
          return;
        }

        if (notesViewRef.current) {
          notesViewRef.current.focus({ preventScroll: true });
        }
        setFocusedCategoryId(null);

        const lastFocused = lastFocusedNoteIdByCategory.get(
          selectedCategoryIds[0],
        );
        if (selectedCategoryIds.length === 1 && lastFocused) {
          setFocusedNoteId(lastFocused);
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
          if (!isDrawerOpen) {
            openDrawer();
          }
          categoriesViewRef.current.focus({ preventScroll: true });
        }
        if (selectedCategoryIds.length === 1) {
          setLastFocusedNoteId({
            categoryId: selectedCategoryIds[0],
            focusedNoteId,
          });
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <AuthRequiredPage className={className} aria-label="mainPage">
      <PageHeader title="Notes" onMenuClick={toggleDrawer} aria-label="helo">
        <IconButton tooltipText="検索モードに移動" onClick={goSearchPage}>
          <SearchNoteIcon />
        </IconButton>
      </PageHeader>

      <Drawer
        width={isMobile ? '80' : '40'}
        isPresistent={!isMobile}
        open={isDrawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
        aria-label="drawer"
      >
        <CategoriesView
          onCategorySelect={setSelectedCategoryIds}
          selectedCategoryIds={selectedCategoryIds}
          onKeyDown={handleCategoriesViewKeyDown}
          ref={categoriesViewRef}
          focused={focusedCategoryId}
          onSetFocused={setFocusedCategoryId}
        />
      </Drawer>
      <NotesView
        selectedCategoryIds={selectedCategoryIds}
        onKeyDown={handleNotesViewKeyDown}
        ref={notesViewRef}
        focusedId={focusedNoteId}
        onSetFocusedId={setFocusedNoteId}
      />
    </AuthRequiredPage>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

export const MainHome = StyledComponent;
