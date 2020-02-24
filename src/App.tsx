import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import AuthRequiredRoute from 'AuthRequiredRoute';
import styled from 'styled-components';
import 'firebase/auth';
import Home from 'Home';
import Login from './Login';

const StyledApp = styled.div`
  background-color: ${props => props.theme.palette.primary.main};
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <StyledApp>
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
    </StyledApp>
  );
};

export default App;
