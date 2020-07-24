import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';
import { GenresContextProvider } from './context/GenresContext';
import { useNotes } from './services/notes';
import { useGenres, Genre } from './services/genres';
import { useCurrentUserId } from './services/auth';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  const { userId, loading } = useCurrentUserId();
  const {
    getAllGenres,
    addGenre,
    removeGenres,
    updateGenre,
    moveGenres,
  } = useGenres(userId);
  const { notes, addNote, removeNotes, updateNote, moveNotes } = useNotes(
    userId,
  );

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      setGenres(await getAllGenres());
    };
    getGenres();
  }, [getAllGenres]);

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
