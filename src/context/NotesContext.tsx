import * as React from 'react';
import { useContext } from 'react';
import { Note, NoteField } from '../services/notes';

export type NotesContextValue = {
  notes: Note[];

  addNote: (genreId: string, noteField: NoteField) => void;
  removeNote: (id: string) => void;
  updateNote: (note: NoteField & { id: string }) => void;
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

export const useNotesContext = () => useContext(NotesContext);
