import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import GenresContext from './context/GenresContext';
import NotesContext from './context/NotesContext';

import { useNotes } from './services/notes';
import { useGenres } from './services/genres';
import { useCurrentUserId } from './services/auth';

import AppRouter from './AppRouter';

const App: React.FC = () => {
  const { userId, loading } = useCurrentUserId();
  const { genres, addGenre, removeGenre, updateGenre, moveGenre } = useGenres(
    userId,
  );
  const { notes, addNote, removeNote, updateNote, moveNote } = useNotes(userId);

  return (
    <GenresContext.Provider
      value={{ genres, addGenre, removeGenre, updateGenre, moveGenre }}
    >
      <NotesContext.Provider
        value={{ notes, addNote, removeNote, updateNote, moveNote }}
      >
        <BrowserRouter>
          <AppRouter userId={userId} userLoading={loading} />
        </BrowserRouter>
      </NotesContext.Provider>
    </GenresContext.Provider>
  );
};

export default App;
