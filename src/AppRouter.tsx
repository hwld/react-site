import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Loading } from './components/project/page/loadingPage/Loading';
import { Login } from './components/project/page/loginPage/LoginHome';
import { MainHome } from './components/project/page/mainPage/MainHome';
import { SearchHome } from './components/project/page/searchNotesPage/SearchHome';
import { AppUser, AuthState } from './services/useAuthService';


type AppRouterProps = {
  user: AppUser;
  authState: AuthState;
};
const AppRouter: React.FC<AppRouterProps> = ({ user, authState }) => {
  return (
    <Switch>
      {authState.loading && <Loading />}
      {user.userId === '' && <Login />}
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
