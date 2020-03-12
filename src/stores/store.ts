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
  notes: Note[];
  genres: Genre[];
  nextNoteId: string;
  nextGenreId: string;
}

const InitialState: Store = {
  uid: null,
  notes: [
    {
      id: '1',
      genreId: '1',
      title: '普通のタイトル',
      text:
        '普通のメモです.\nCSSが難しいです.\nHTMLも難しいです.\nJavaScriptも難しいです.\nタイトル、本文、メタデータの区別がつきにくいので色々いじります.',
      authorName: '普通の著者',
      bookName: '普通の著書',
    },
    {
      id: '2',
      genreId: '1',
      title: 'title1-2',
      text:
        'text-2text1t1-2text1-1textt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2t1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2tt1-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2t-2text1-1text1-1text11-2texext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1text1-1text1-1teext11-2text1-1txt1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1textt1-1text11-2text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1text1-1',
      authorName: 'autho1-2',
      bookName: 'book1-2',
    },
    {
      id: '3',
      genreId: '4',
      title: 'title4-1',
      text: 'text4-1',
      authorName: 'autho4-1',
      bookName: 'book4-1',
    },
    {
      id: '4',
      genreId: '4',
      title: 'title4-1',
      text: 'text4-1',
      authorName: 'autho4-1',
      bookName: 'book4-1',
    },
    {
      id: '5',
      genreId: '4',
      title: 'title4-1',
      text: 'text4-1',
      authorName: 'autho4-1',
      bookName: 'book4-1',
    },
    {
      id: '6',
      genreId: '4',
      title: 'title4-1',
      text: 'text4-1',
      authorName: 'autho4-1',
      bookName: 'book4-1',
    },
    {
      id: '7',
      genreId: '4',
      title: 'title4-1',
      text: 'text4-1',
      authorName: 'autho4-1',
      bookName: 'book4-1',
    },
  ],
  genres: [
    { genreName: 'genre1', id: '1', parentGenreId: '', childrenGenreIds: [] },
    {
      genreName: 'genre2',
      id: '2',
      parentGenreId: '',
      childrenGenreIds: ['3', '5'],
    },
    {
      genreName: 'genre2-1',
      id: '3',
      parentGenreId: '2',
      childrenGenreIds: ['4'],
    },
    {
      genreName: 'genre2-2',
      id: '5',
      parentGenreId: '2',
      childrenGenreIds: [],
    },
    {
      genreName: 'genre2-1-1',
      id: '4',
      parentGenreId: '3',
      childrenGenreIds: [],
    },
  ],
  nextNoteId: '8',
  nextGenreId: '6',
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
      const newGenre: Genre = { ...action.payload, id: state.nextGenreId };

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
      return {
        ...state,
        nextGenreId: state.nextGenreId + 1,
        genres: [...genresWithChildrenAdded, newGenre],
      };
    },

    removeGenre: (state, action: PayloadAction<string>) => {
      const removeGenre = state.genres.find(
        genre => genre.id === action.payload,
      );

      if (!removeGenre) {
        return state;
      }

      // 削除する必要のあるGenreIdを取得
      const removeIds = [
        removeGenre.id,
        ...getChildrenGenreIds(state.genres, removeGenre),
      ];

      // 削除済みジャンル
      const removedGenres = state.genres.filter(
        genre => !removeIds.includes(genre.id),
      );

      // 削除済みメモ
      const removedNotes = state.notes.filter(
        note => !removeIds.includes(note.genreId),
      );

      return { ...state, genres: removedGenres, notes: removedNotes };
    },

    updateGenre: (state, action: PayloadAction<Genre>) => {
      const updatedGenre = action.payload;
      const updatedGenres = state.genres.map(genre => {
        if (genre.id === updatedGenre.id) {
          return {
            ...genre,
            genreName: updatedGenre.genreName,
          };
        }

        return genre;
      });

      return { ...state, genres: updatedGenres };
    },

    // Notes
    addNote: (state, action: PayloadAction<Note>) => {
      const newNote = { ...action.payload, id: state.nextNoteId };

      return {
        ...state,
        nextNoteId: state.nextNoteId + 1,
        notes: [...state.notes, newNote],
      };
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      return {
        ...state,
        notes: state.notes.filter(note => note.id !== id),
      };
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const updatedNote = action.payload;
      const updatedNotes = state.notes.map(note => {
        if (note.id === updatedNote.id)
          return {
            ...note,
            title: updatedNote.title,
            text: updatedNote.text,
            authorName: updatedNote.authorName,
            bookName: updatedNote.bookName,
          };

        return note;
      });

      return { ...state, notes: updatedNotes };
    },
  },
});

export const {
  setUserUid,
  addGenre,
  removeGenre,
  updateGenre,
  addNote,
  removeNote,
  updateNote,
} = slice.actions;
export default slice.reducer;
