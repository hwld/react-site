import * as React from 'react';
import { Note, NoteField } from '../services/notes';

type NotesContextValue = {
  notes: Note[];

  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, noteField: NoteField) => void;
  moveNote: (noteId: string, destGenreId: string) => void;
};

const NotesContext = React.createContext<NotesContextValue>({
  notes: [],

  addNote: () => {},
  removeNote: () => {},
  updateNote: () => {},
  moveNote: () => {},
});

export default NotesContext;
