import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NoteField {
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

export type Note = NoteField & {
  id: string;
  genreId: string;
};

export interface GenreField {
  genreName: string;
}

export type Genre = GenreField & {
  id: string;
  parentGenreId: string;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
};

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
