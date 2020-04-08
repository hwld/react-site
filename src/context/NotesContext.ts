import * as React from 'react';
import { Note, NoteField } from 'services/notes';

type NotesContextValue = {
  notes: Note[];

  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, noteField: NoteField) => void;
  moveNote: (noteId: string, destGenreId: string) => void;
};

const NotesContext = React.createContext<NotesContextValue>({
  notes: [],

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addNote: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeNote: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateNote: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  moveNote: () => {},
});

export default NotesContext;
