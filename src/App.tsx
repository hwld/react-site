import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNotes } from './repositories/notes';
import { useGenres } from './repositories/genres';
import { useCurrentUserId } from './repositories/auth';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  const { userId, loading } = useCurrentUserId();
  const { genres, addGenre, removeGenres, updateGenre, moveGenres } = useGenres(
    userId,
  );
  const { notes, addNote, removeNotes, updateNote, moveNotes } = useNotes(
    userId,
  );

  return (
    <GenresContextProvider
      value={{ genres, addGenre, removeGenres, updateGenre, moveGenres }}
    >
      <NotesContextProvider
        value={{ notes, addNote, removeNotes, updateNote, moveNotes }}
      >
        <BrowserRouter>
          <AppRouter userId={userId} userLoading={loading} />
        </BrowserRouter>
      </NotesContextProvider>
    </GenresContextProvider>
  );
};

export default App;
