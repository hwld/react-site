import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRequiredRoute from 'components/AuthRequiredRoute';
import 'firebase/auth';
import Home from 'components/Home';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthRequiredRoute path="/home">
            <Home />
          </AuthRequiredRoute>

          <Route path="/login">
            <Login />
          </Route>

          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
