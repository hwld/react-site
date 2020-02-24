import React, { useState, useEffect } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { setUserUid } from 'stores/user';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const AuthRequiredRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [isLoading, setisLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.console.log('route effect');
    const unSubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUserUid(user.uid));
        setIsLoggedin(true);
      }
      setisLoading(false);
    });

    return () => {
      unSubscribe();
      window.console.log('route effect unsubscribe');
    };
  }, [dispatch]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Route {...rest}>
      {isLoggedin ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  );
};

export default AuthRequiredRoute;
