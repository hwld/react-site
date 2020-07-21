import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNotes } from './services/notes';
import { useGenres } from './services/genres';
import { useCurrentUserId } from './services/auth';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  const { userId, loading } = useCurrentUserId();
  const { genres, addGenre, removeGenre, updateGenre, moveGenre } = useGenres(
    userId,
  );
  const { notes, addNote, removeNotes, updateNote, moveNotes } = useNotes(
    userId,
  );

  return (
    <GenresContextProvider
      value={{ genres, addGenre, removeGenre, updateGenre, moveGenre }}
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
