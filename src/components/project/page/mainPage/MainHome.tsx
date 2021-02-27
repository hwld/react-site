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
import { AppHeader } from '../../ui/AppHeader';
import { useAuthContext } from '../../../../context/AuthContext';
import { Loading } from '../../ui/Loading';
import { LoginDialog } from '../../ui/LoginDialog';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  const {
    isMobile,
    selectedCategoryIds,
    setSelectedCategoryIds,
  } = useAppStateContext();
  const { user, authState } = useAuthContext();
  const history = useHistory();
  const { isOpen, open, close, toggle } = useOpener(true);
  const categoriesViewRef = useRef<HTMLUListElement | null>(null);
  const notesViewRef = useRef<HTMLUListElement | null>(null);

  const [focusedCategoryId, setFocusedCategoryId] = useState<string | null>(
    null,
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

  const isLoading = authState.loading;
  const isNotLogin = !authState.loading && user.userId === '';

  const goSearchMode = () => {
    history.replace('/search');
  };

  const handleCategoriesViewKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement>,
  ) => {
    switch (event.key) {
      case 'ArrowRight': {
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
    <div className={className} aria-label="mainPage">
      <AppHeader title="Notes" onMenuClick={toggle}>
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

      {isLoading && <Loading />}
      {isNotLogin && <LoginDialog />}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

export const MainHome = StyledComponent;
