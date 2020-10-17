import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoadingHome } from './components/project/page/loadingPage/LoadingHome';
import { LoginHome } from './components/project/page/loginPage/LoginHome';
import { MainHome } from './components/project/page/mainPage/MainHome';
import { SearchHome } from './components/project/page/searchNotesPage/SearchHome';
import { AppUser, AuthState } from './services/auth';

type AppRouterProps = {
  user: AppUser;
  authState: AuthState;
};
const AppRouter: React.FC<AppRouterProps> = ({ user, authState }) => {
  return (
    <Switch>
      {authState.loading && <LoadingHome />}
      {user.userId === '' && <LoginHome />}
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

export { AppRouter };
