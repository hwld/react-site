import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/CategoriesContext';
import { useNotes } from './services/notes';
import { useGenres } from './services/categories';
import { useAuth } from './services/auth';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';
import { useAppState } from './services/appState';
import { AppStateProvider } from './context/AppStateContext';

const App: React.FC = () => {
  const appStateService = useAppState();
  const authService = useAuth();
  const noteService = useNotes(authService.user.userId);
  const genreService = useGenres(
    authService.user.userId,
    noteService,
    appStateService,
  );

  return (
    <AppStateProvider value={appStateService}>
      <AuthContextProvider value={authService}>
        <GenresContextProvider value={genreService}>
          <NotesContextProvider value={noteService}>
            <BrowserRouter>
              <AppRouter
                user={authService.user}
                authState={authService.authState}
              />
            </BrowserRouter>
          </NotesContextProvider>
        </GenresContextProvider>
      </AuthContextProvider>
    </AppStateProvider>
  );
};

export { App };
