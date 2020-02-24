import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from 'stores/user';

const reducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof reducer>;

const store = configureStore({ reducer });

export default store;
