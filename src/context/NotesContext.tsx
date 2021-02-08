import * as React from 'react';
import { useContext } from 'react';
import { getDefaultNoteService, NoteService } from '../services/notes';

const NotesContext = React.createContext<NoteService>(getDefaultNoteService());

export const NotesContextProvider: React.FC<{
  value: Partial<NoteService>;
}> = ({ children, value }) => {
  return (
    <NotesContext.Provider value={{ ...getDefaultNoteService(), ...value }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
