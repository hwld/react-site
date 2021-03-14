import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainHome } from './components/project/page/mainPage/MainHome';
import { SearchHome } from './components/project/page/searchNotesPage/SearchHome';
import { useAppStateContext } from './context/AppStateContext';

const Component: React.FC = () => {
  const { isMobile } = useAppStateContext();

  return (
    <Switch>
      <Route path="/home">
        <MainHome isMobile={isMobile} />
      </Route>

      <Route path="/search">
        <SearchHome isMobile={isMobile} />
      </Route>

      <Redirect to="/home" />
    </Switch>
  );
};

export const AppRouter = Component;
