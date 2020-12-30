import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainHome } from './components/project/page/mainPage/MainHome';
import { SearchHome } from './components/project/page/searchNotesPage/SearchHome';

const Component: React.FC = () => {
  return (
    <Switch>
      <Route path="/home">
        <MainHome />
      </Route>

      <Route path="/search">
        <SearchHome />
      </Route>

      <Redirect to="/home" />
    </Switch>
  );
};

export const AppRouter = Component;
