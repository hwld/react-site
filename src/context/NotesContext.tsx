import * as React from 'react';
import { useContext } from 'react';
import {
  defaultNoteStoreService,
  NoteStoreService,
} from '../services/useNoteStoreService';

const NotesContext = React.createContext<NoteStoreService>(
  defaultNoteStoreService(),
);

export const NotesContextProvider: React.FC<{ value: NoteStoreService }> = ({
  children,
  value,
}) => {
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
