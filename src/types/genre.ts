export type GenreField = {
  genreName: string;
};

export type GenreDate = {
  createdAt: Date;
};

export type GenreInfo = {
  id: string;
  parentGenreId: string;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
};

export type Genre = GenreField & GenreDate & GenreInfo;

export type GenreStoreService = {
  genres: Genre[];
  addGenre: (parentGenreId: string, genreField: GenreField) => void;
  removeGenres: (id: string[]) => void;
  updateGenre: (genre: GenreField & { id: string }) => void;
  moveGenres: (genreId: string[], destGenreId: string) => void;
};
