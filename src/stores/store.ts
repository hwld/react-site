import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Store {
  uid: string | null;
}

const InitialState: Store = {
  uid: null,
};

const slice = createSlice({
  name: 'user',
  initialState: InitialState,
  reducers: {
    // User
    setUserUid: (state, action: PayloadAction<string | null>) => ({
      ...state,
      uid: action.payload,
    }),
  },
});

export const { setUserUid } = slice.actions;
export default slice.reducer;
