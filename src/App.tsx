import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { auth } from 'firebase';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNotes } from './repositories/notes';
import { useGenres } from './repositories/genres';
import { useAuth } from './repositories/auth';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';

const App: React.FC = () => {
  const {
    user,
    authState,
    googleLogin,
    anonymousLogin,
    logout,
    linkWithGoogle,
    deleteAccount,
  } = useAuth();
  const { genres, addGenre, removeGenres, updateGenre, moveGenres } = useGenres(
    user.userId,
  );
  const { notes, addNote, removeNotes, updateNote, moveNotes } = useNotes(
    user.userId,
  );

  return (
    <AuthContextProvider
      value={{
        user,
        authState,
        googleLogin,
        anonymousLogin,
        logout,
        linkWithGoogle,
        deleteAccount,
      }}
    >
      <GenresContextProvider
        value={{ genres, addGenre, removeGenres, updateGenre, moveGenres }}
      >
        <NotesContextProvider
          value={{ notes, addNote, removeNotes, updateNote, moveNotes }}
        >
          <BrowserRouter>
            <AppRouter user={user} authState={authState} />
          </BrowserRouter>
        </NotesContextProvider>
      </GenresContextProvider>
    </AuthContextProvider>
  );
};

export { App };
