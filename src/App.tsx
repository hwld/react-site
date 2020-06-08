import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import GenresContext from './context/GenresContext';
import NotesContext from './context/NotesContext';
import Login from './components/project/page/loginPage/Login';
import Loading from './components/project/page/loadingPage/Loading';
import { useNotes } from './services/notes';
import { useGenres } from './services/genres';
import { useCurrentUserId } from './services/auth';
import SearchNotesHome from './components/project/page/searchNotesPage/Home';
import MainHome from './components/project/page/mainPage/Home';

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
          <Switch>
            {loading && <Loading />}
            {userId === '' && <Login />}
            <Route path="/home">
              <MainHome />
            </Route>

            <Route path="/search">
              <SearchNotesHome />
            </Route>

            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </NotesContext.Provider>
    </GenresContext.Provider>
  );
};

export default App;
