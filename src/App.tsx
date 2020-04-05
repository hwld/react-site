import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import AuthRequiredRoute from 'components/AuthRequiredRoute';
import Home from 'components/Home';
import SearchNotes from 'components/SearchNotesHome';
import { useCurrentUserId } from 'services/auth';
import { useGenres } from 'services/storage/genres';
import { useNotes } from 'services/storage/notes';
import GenresContext from 'Context/GenresContext';
import NotesContext from 'Context/NotesContext';

const App: React.FC = () => {
  const { userId } = useCurrentUserId();
  const { genres, addGenre, removeGenre, updateGenre } = useGenres(userId);
  const { notes, addNote, removeNote, updateNote, moveNote } = useNotes(userId);

  return (
    <GenresContext.Provider
      value={{ genres, addGenre, removeGenre, updateGenre }}
    >
      <NotesContext.Provider
        value={{ notes, addNote, removeNote, updateNote, moveNote }}
      >
        <BrowserRouter>
          <Switch>
            <AuthRequiredRoute path="/home">
              <Home />
            </AuthRequiredRoute>

            <AuthRequiredRoute path="/search">
              <SearchNotes />
            </AuthRequiredRoute>

            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </NotesContext.Provider>
    </GenresContext.Provider>
  );
};

export default App;
