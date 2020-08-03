export type NoteField = {
  title: string;
  text: string;
  authorName: string;
  bookName: string;
};

export type NoteDate = {
  createdAt: Date;
  updatedAt: Date;
};

export type NoteInfo = {
  id: string;
  genreId: string;
};

export type Note = NoteField & NoteDate & NoteInfo;

export interface SearchNotesCriteria {
  genreId: string;
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

export type NoteStoreService = {
  notes: Note[];

  addNote: (genreId: string, noteField: NoteField) => void;
  removeNotes: (ids: string[]) => void;
  updateNote: (note: NoteField & { id: string }) => void;
  moveNotes: (noteIds: string[], destGenreId: string) => void;
};
