import React, { useState, useEffect } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { setUserUid } from 'stores/store';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';

const AuthRequiredRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    const unSubscribe = firebase.auth().onAuthStateChanged(user => {
      window.console.log('route onAuthStateChanged');
      if (user) {
        dispatch(setUserUid(user.uid));
      }
      setisLoading(false);
    });

    return unSubscribe;
  }, [dispatch]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Route {...rest}>
      {uid ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  );
};

export default AuthRequiredRoute;
