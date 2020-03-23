import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { setUserUid } from 'stores/store';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useCurrentUserId } from 'services/auth';
import Login from './Login';

const AuthRequiredRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { userId, loading } = useCurrentUserId();
  const { uid } = useSelector((state: RootState) => state.reactNotes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(setUserUid(userId));
    } else {
      dispatch(setUserUid(null));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return <Route {...rest}>{uid ? children : <Login />}</Route>;
};

export default AuthRequiredRoute;
