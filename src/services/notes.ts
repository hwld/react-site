import { useMemo, useCallback } from 'react';
import {
  useCollection,
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import { db, firebase } from './firebaseConfig';

export interface NoteField {
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

export interface NoteDate {
  createdAt: Date;
  updatedAt: Date;
}

interface FirestoreNoteDate {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

export interface NoteInfo {
  id: string;
  genreId: string;
}

export type Note = NoteField & NoteDate & NoteInfo;
type FirestoreNote = NoteField & FirestoreNoteDate & NoteInfo;

export interface SearchNotesCriteria {
  genreId: string;
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

const createDefaultSearchNotesCriteria = () => {
  return { genreId: '', title: '', text: '', authorName: '', bookName: '' };
};

const createDefaultNoteField = () => {
  return { title: '', text: '', authorName: '', bookName: '' };
};

const useNotes = (uid: string) => {
  const notesRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('notes');
  }, [uid]);

  const [notesCollection] = useCollectionData<FirestoreNote>(notesRef);
  const notes = useMemo(() => {
    if (!notesCollection) {
      return [];
    }

    return notesCollection.map<Note>(note => {
      return {
        id: note.id,
        genreId: note.genreId,
        title: note.title,
        text: note.text,
        authorName: note.authorName,
        bookName: note.bookName,
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
        genreId,
        title: noteField.title,
        text: noteField.text,
        authorName: noteField.authorName,
        bookName: noteField.bookName,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      newNoteRef.set(newNote);
    },
    [notesRef],
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
        authorName: note.authorName,
        bookName: note.bookName,
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
          genreId: destGenreId,
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        }),
      );
      batch.commit();
    },
    [notesRef],
  );

  return { notes, addNote, removeNotes, updateNote, moveNotes };
};

export { useNotes, createDefaultSearchNotesCriteria, createDefaultNoteField };
