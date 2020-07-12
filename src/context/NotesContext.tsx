import * as React from 'react';
import { Note, NoteField } from '../services/notes';

export type NotesContextValue = {
  notes: Note[];

  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, noteField: NoteField) => void;
  moveNote: (noteId: string, destGenreId: string) => void;
};

export const notesContextDefaultValue: NotesContextValue = {
  notes: [],

  addNote: () => {},
  removeNote: () => {},
  updateNote: () => {},
  moveNote: () => {},
};

const NotesContext = React.createContext<NotesContextValue>(
  notesContextDefaultValue,
);

export const NotesContextProvider: React.FC<{ value: NotesContextValue }> = ({
  children,
  value,
}) => {
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export default NotesContext;
