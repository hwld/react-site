import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNoteStoreService } from './services/noteStoreService';
import { useGenreStoreService } from './services/genreStoreService';
import { useAuthService } from './services/authService';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';
import { useAppState } from './services/appState';
import { AppStateProvider } from './context/AppStateContext';

const App: React.FC = () => {
  const authService = useAuthService();
  const appStateService = useAppState();
  const genreService = useGenreStoreService(authService.user.userId);
  const noteService = useNoteStoreService(authService.user.userId);

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
