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

// 指定されたジャンルの子ジャンルのidをすべて取得
const getChildrenGenreIds = (allGenres: Genre[], genre: Genre): string[] => {
  const grandChildrenGenreIds: string[] = [];

  genre.childrenGenreIds.forEach(id => {
    const childGenre = allGenres.find(child => child.id === id);

    if (childGenre) {
      grandChildrenGenreIds.push(...getChildrenGenreIds(allGenres, childGenre));
    }
  });

  return [...genre.childrenGenreIds, ...grandChildrenGenreIds];
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

    // Genres
    addGenre: (state, action: PayloadAction<Genre>) => {
      const newGenre = action.payload;

      // newGenreの親ジャンルのchildreGenresIdsにnewGenreのidを追加したもの
      const genresWithChildrenAdded = state.genres.map(genre => {
        if (genre.id === newGenre.parentGenreId)
          return {
            ...genre,
            childrenGenreIds: [...genre.childrenGenreIds, newGenre.id],
          };

        return genre;
      });

      // newGenreを追加
      return { ...state, genres: [...genresWithChildrenAdded, newGenre] };
    },

    removeGenre: (state, action: PayloadAction<string>) => {
      const deleteGenre = state.genres.find(
        genre => genre.id === action.payload,
      );

      if (!deleteGenre) {
        return state;
      }

      // 削除する必要のあるGenreIdを取得
      const deleteIds = [
        deleteGenre.id,
        ...getChildrenGenreIds(state.genres, deleteGenre),
      ];

      // 削除済みジャンル
      const deletedGenres = state.genres.filter(
        genre => !deleteIds.includes(genre.id),
      );

      // 削除済みメモ
      const deletedNotes = state.notes.filter(
        note => !deleteIds.includes(note.genreId),
      );

      return { ...state, genres: deletedGenres, notes: deletedNotes };
    },

    // Notes
    addNote: (state, action: PayloadAction<Note>) => {
      const note = action.payload;

      return {
        ...state,
        notes: [...state.notes, note],
      };
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      return {
        ...state,
        notes: state.notes.filter(note => note.id !== id),
      };
    },
  },
});

export const { setUserUid } = slice.actions;
export default slice.reducer;
