import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { CategoriesContextProvider } from './context/CategoriesContext';
import { useNotes } from './services/notes';
import { useCategories } from './services/categories';
import { useAuth } from './services/auth';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';
import { useAppState } from './services/appState';
import { AppStateProvider } from './context/AppStateContext';

const App: React.FC = () => {
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
            <BrowserRouter>
              <AppRouter
                user={authService.user}
                authState={authService.authState}
              />
            </BrowserRouter>
          </NotesContextProvider>
        </CategoriesContextProvider>
      </AuthContextProvider>
    </AppStateProvider>
  );
};

export { App };
