import { db } from 'services/firebaseConfig';
import { useMemo, useCallback } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

export interface NoteField {
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

export type Note = NoteField & {
  id: string;
  genreId: string;
};

const useNotes = (uid: string) => {
  const notesRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid}`)
      .collection('notes');
  }, [uid]);

  const [notesCollection] = useCollection(notesRef);
  const notes = useMemo(() => {
    if (!notesCollection) {
      return [];
    }

    return notesCollection.docs.map(noteDoc => {
      return noteDoc.data() as Note;
    });
  }, [notesCollection]);

  const addNote = useCallback(
    (note: Note) => {
      const newNoteRef = notesRef.doc();

      newNoteRef.set({ ...note, id: newNoteRef.id });
    },
    [notesRef],
  );

  const removeNote = useCallback(
    (id: string) => {
      notesRef.doc(id).delete();
    },
    [notesRef],
  );

  const updateNote = useCallback(
    (note: Note) => {
      notesRef.doc(note.id).update({ ...note });
    },
    [notesRef],
  );

  return { notes, addNote, removeNote, updateNote };
};

export { useNotes };
