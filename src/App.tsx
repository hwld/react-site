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

const App: React.FC = () => {
  const authService = useAuth();
  const genresService = useGenres(authService.user.userId);
  const notesService = useNotes(authService.user.userId);

  return (
    <AuthContextProvider value={authService}>
      <GenresContextProvider value={genresService}>
        <NotesContextProvider value={notesService}>
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
