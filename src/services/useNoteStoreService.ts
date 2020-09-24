import { useMemo, useCallback } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, firebase } from './firebaseConfig';

// types
export type NoteField = {
  title: string;
  text: string;
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
}

export interface NotesSortOrder {
  targetField: keyof NoteDate | keyof NoteField;
  order: 'asc' | 'desc';
}

export type NoteStoreService = {
  notes: Note[];

  addNote: (genreId: string, noteField: NoteField) => void;
  removeNotes: (ids: string[]) => void;
  updateNote: (note: NoteField & { id: string }) => void;
  moveNotes: (noteIds: string[], destGenreId: string) => void;
};

type FirestoreNoteDate = {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};

type FirestoreNoteInfo = {
  id: string;
  genreRef: firebase.firestore.DocumentReference;
};

type FirestoreNote = NoteField & FirestoreNoteDate & FirestoreNoteInfo;

// default value
export const getDefaultNote = (): Note => ({
  id: '',
  genreId: '',
  title: '',
  text: '',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const getDefaultNoteStoreService = (): NoteStoreService => ({
  notes: [],

  addNote: () => {},
  removeNotes: () => {},
  updateNote: () => {},
  moveNotes: () => {},
});

// hook
export const useNoteStoreService = (uid: string): NoteStoreService => {
  const notesRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('notes');
  }, [uid]);

  const genresRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('genres');
  }, [uid]);

  const [notesCollection] = useCollectionData<FirestoreNote>(notesRef);
  const notes = useMemo(() => {
    if (!notesCollection) {
      return [];
    }

    return notesCollection.map<Note>(note => {
      return {
        id: note.id,
        genreId: note.genreRef.id,
        title: note.title,
        text: note.text,
        createdAt: note.createdAt.toDate(),
        updatedAt: note.updatedAt.toDate(),
      };
    });
  }, [notesCollection]);

  const addNote = useCallback(
    (genreId: string, noteField: NoteField) => {
      const newNoteRef = notesRef.doc();

      const newNote: FirestoreNote = {
        id: newNoteRef.id,
        genreRef: genresRef.doc(genreId),
        title: noteField.title,
        text: noteField.text,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      newNoteRef.set(newNote);
    },
    [genresRef, notesRef],
  );

  const removeNotes = useCallback(
    (ids: string[]) => {
      const batch = db.batch();
      ids.forEach(id => {
        batch.delete(notesRef.doc(id));
      });
      batch.commit();
    },
    [notesRef],
  );

  const updateNote = useCallback(
    (note: NoteField & { id: string }) => {
      const newNote: NoteField = {
        title: note.title,
        text: note.text,
      };

      notesRef.doc(note.id).update({
        ...newNote,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    },
    [notesRef],
  );

  const moveNotes = useCallback(
    (noteIds: string[], destGenreId: string) => {
      const batch = db.batch();
      noteIds.forEach(id =>
        batch.update(notesRef.doc(id), {
          genreRef: genresRef.doc(destGenreId),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        }),
      );
      batch.commit();
    },
    [genresRef, notesRef],
  );

  return { notes, addNote, removeNotes, updateNote, moveNotes };
};
