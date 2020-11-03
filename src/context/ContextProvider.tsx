import React from 'react';
import { useAppState } from '../services/appState';
import { useAuth } from '../services/auth';
import { useCategories } from '../services/categories';
import { useNotes } from '../services/notes';
import { AppStateProvider } from './AppStateContext';
import { AuthContextProvider } from './AuthContext';
import { CategoriesContextProvider } from './CategoriesContext';
import { NotesContextProvider } from './NotesContext';

const ContextProvider: React.FC = ({ children }) => {
  const appStateService = useAppState();
  const authService = useAuth();
  const noteService = useNotes(authService.user.userId);
  const categoryService = useCategories(
    authService.user.userId,
    noteService,
    appStateService,
  );

  return (
    <AppStateProvider value={appStateService}>
      <AuthContextProvider value={authService}>
        <CategoriesContextProvider value={categoryService}>
          <NotesContextProvider value={noteService}>
            {children}
          </NotesContextProvider>
        </CategoriesContextProvider>
      </AuthContextProvider>
    </AppStateProvider>
  );
};

export { ContextProvider };
