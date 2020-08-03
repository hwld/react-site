import * as React from 'react';
import { useContext } from 'react';
import { NoteStoreService } from '../types/note';

const NotesContext = React.createContext<NoteStoreService>({
  notes: [],

  addNote: () => {},
  removeNotes: () => {},
  updateNote: () => {},
  moveNotes: () => {},
});

export const NotesContextProvider: React.FC<{ value: NoteStoreService }> = ({
  children,
  value,
}) => {
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
