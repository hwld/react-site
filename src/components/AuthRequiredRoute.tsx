import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { setUserUid } from 'stores/store';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useCurrentUser } from 'service/auth';
import Login from './Login';

const AuthRequiredRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user, loading } = useCurrentUser();
  const { uid } = useSelector((state: RootState) => state.reactNotes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUserUid(user.uid));
    } else {
      dispatch(setUserUid(null));
    }
  }, [dispatch, user]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return <Route {...rest}>{uid ? children : <Login />}</Route>;
};

export default AuthRequiredRoute;
