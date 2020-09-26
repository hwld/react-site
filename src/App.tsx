import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNotes } from './services/notes';
import { useGenres } from './services/genres';
import { useAuth } from './services/auth';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';
import { useAppState } from './services/appState';
import { AppStateProvider } from './context/AppStateContext';

const App: React.FC = () => {
  const authService = useAuth();
  const appStateService = useAppState();
  const noteService = useNotes(authService.user.userId);
  const genreService = useGenres(authService.user.userId, noteService);

  return (
    <AuthContextProvider value={authService}>
      <AppStateProvider value={appStateService}>
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
      </AppStateProvider>
    </AuthContextProvider>
  );
};

export { App };
