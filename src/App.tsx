import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNoteStoreService } from './services/useNoteStoreService';
import { useGenreStoreService } from './services/useGenreStoreService';
import { useAuthService } from './services/useAuthService';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';

const App: React.FC = () => {
  const authService = useAuthService();
  const genreService = useGenreStoreService(authService.user.userId);
  const noteService = useNoteStoreService(authService.user.userId);

  return (
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
  );
};

export { App };
