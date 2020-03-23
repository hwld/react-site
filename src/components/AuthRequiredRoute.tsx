import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useCurrentUserId } from 'services/auth';
import Login from './Login';

const AuthRequiredRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { userId, loading } = useCurrentUserId();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return <Route {...rest}>{userId !== '' ? children : <Login />}</Route>;
};

export default AuthRequiredRoute;
