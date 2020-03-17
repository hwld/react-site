import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import AuthRequiredRoute from 'components/AuthRequiredRoute';
import Home from 'components/Home';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthRequiredRoute path="/home">
            <Home />
          </AuthRequiredRoute>

          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
