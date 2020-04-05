import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Home from 'components/Home';
import SearchNotes from 'components/SearchNotesHome';
import { useCurrentUserId } from 'services/auth';
import { useGenres } from 'services/storage/genres';
import { useNotes } from 'services/storage/notes';
import GenresContext from 'context/GenresContext';
import NotesContext from 'context/NotesContext';
import Login from 'components/Login';
import Loading from 'components/Loading';

const App: React.FC = () => {
  const { userId, loading } = useCurrentUserId();
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
            {loading && <Loading />}
            {userId === '' && <Login />}
            <Route path="/home">
              <Home />
            </Route>

            <Route path="/search">
              <SearchNotes />
            </Route>

            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </NotesContext.Provider>
    </GenresContext.Provider>
  );
};

export default App;
