import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  genreId: string;
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

export interface Genre {
  genreName: string;
  id: string;
  parentGenreId: string | null;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
}

interface Store {
  uid: string | null;
  notes: Note[];
  genres: Genre[];
}

const InitialState: Store = {
  uid: null,
  notes: [],
  genres: [],
};

const slice = createSlice({
  name: 'user',
  initialState: InitialState,
  reducers: {
    setUserUid: (state, action: PayloadAction<string | null>) => ({
      ...state,
      uid: action.payload,
    }),
  },
});

export const { setUserUid } = slice.actions;
export default slice.reducer;
