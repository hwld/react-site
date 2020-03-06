import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  uid: string | null;
}

const userInitialState: User = {
  uid: null,
};

const slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUserUid: (state, action: PayloadAction<string | null>) => ({
      ...state,
      uid: action.payload,
    }),
  },
});

export const { setUserUid } = slice.actions;
export default slice.reducer;
