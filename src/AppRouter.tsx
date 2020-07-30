import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from './components/project/page/loadingPage/Loading';
import Login from './components/project/page/loginPage/LoginHome';
import MainHome from './components/project/page/mainPage/MainHome';
import SearchHome from './components/project/page/searchNotesPage/SearchHome';

type AppRouterProps = {
  userId: string;
  userLoading: boolean;
};

const AppRouter: React.FC<AppRouterProps> = ({ userId, userLoading }) => {
  return (
    <Switch>
      {userLoading && <Loading />}
      {userId === '' && <Login />}
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

export default AppRouter;
