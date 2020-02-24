import React from 'react';
import { Typography } from '@material-ui/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { setUserUid } from 'stores/user';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <Typography>Hello</Typography>
      <button
        type="button"
        onClick={() => {
          firebase.auth().signOut();
          dispatch(setUserUid(null));
          history.replace('/login');
        }}
      >
        ログアウト
      </button>
    </>
  );
};

export default Home;
