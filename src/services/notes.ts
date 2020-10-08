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

type FirestoreNoteDate = {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};

export type NoteInfo = {
  id: string;
  categoryId: string;
};

type FirestoreNoteInfo = {
  id: string;
  categoryRef: firebase.firestore.DocumentReference;
};

export type Note = NoteField & NoteDate & NoteInfo;

type FirestoreNote = NoteField & FirestoreNoteDate & FirestoreNoteInfo;

export interface SearchNotesCriteria {
  categoryId: string;
  title: string;
  text: string;
}

export interface NotesSortOrder {
  targetField: keyof NoteDate | keyof NoteField;
  order: 'asc' | 'desc';
}

export type NoteService = {
  notes: Note[];

  addNote: (categoryId: string, noteField: NoteField) => void;
  removeNotes: (ids: string[]) => void;
  updateNote: (note: NoteField & { id: string }) => void;
  moveNotes: (noteIds: string[], destCategoryId: string) => void;
};

// default value
export const getDefaultNote = (): Note => ({
  id: '',
  categoryId: '',
  title: '',
  text: '',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const getDefaultNoteService = (): NoteService => ({
  notes: [],

  addNote: () => {},
  removeNotes: () => {},
  updateNote: () => {},
  moveNotes: () => {},
});

export const getDefaultNotesSortOrder = (): NotesSortOrder => ({
  targetField: 'text',
  order: 'asc',
});

// hook
export const useNotes = (uid: string): NoteService => {
  const notesRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('notes');
  }, [uid]);

  const categoriesRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('categories');
  }, [uid]);

  const [notesCollection] = useCollectionData<FirestoreNote>(notesRef);
  const notes = useMemo(() => {
    if (!notesCollection) {
      return [];
    }

    return notesCollection.map<Note>(note => {
      return {
        id: note.id,
        categoryId: note.categoryRef.id,
        title: note.title,
        text: note.text,
        createdAt: note.createdAt.toDate(),
        updatedAt: note.updatedAt.toDate(),
      };
    });
  }, [notesCollection]);

  const addNote = useCallback(
    (categoryId: string, noteField: NoteField) => {
      const newNoteRef = notesRef.doc();

      const now = new Date();

      const newNote: FirestoreNote = {
        id: newNoteRef.id,
        categoryRef: categoriesRef.doc(categoryId),
        title: noteField.title,
        text: noteField.text,
        createdAt: firebase.firestore.Timestamp.fromDate(now),
        updatedAt: firebase.firestore.Timestamp.fromDate(now),
      };
      newNoteRef.set(newNote);
    },
    [categoriesRef, notesRef],
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
    (noteIds: string[], destCategoryId: string) => {
      const batch = db.batch();
      noteIds.forEach(id =>
        batch.update(notesRef.doc(id), {
          categoryRef: categoriesRef.doc(destCategoryId),
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        }),
      );
      batch.commit();
    },
    [categoriesRef, notesRef],
  );

  return { notes, addNote, removeNotes, updateNote, moveNotes };
};
