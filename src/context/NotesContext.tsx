import * as React from 'react';
import { useContext } from 'react';
import { Note, NoteField } from '../repositories/notes';

export type NotesContextValue = {
  notes: Note[];

  addNote: (genreId: string, noteField: NoteField) => void;
  removeNotes: (ids: string[]) => void;
  updateNote: (note: NoteField & { id: string }) => void;
  moveNotes: (noteIds: string[], destGenreId: string) => void;
};

export const notesContextDefaultValue: NotesContextValue = {
  notes: [],

  addNote: () => {},
  removeNotes: () => {},
  updateNote: () => {},
  moveNotes: () => {},
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
