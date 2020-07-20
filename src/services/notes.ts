import { useMemo, useCallback } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
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

  const [notesCollection] = useCollection(notesRef);
  const notes = useMemo(() => {
    if (!notesCollection) {
      return [];
    }

    return notesCollection.docs.map(noteDoc => {
      const data = noteDoc.data();

      // Note型のDate関連だけTimestampからDateに変換したい.
      const noteOtherThanDate = data as NoteField & NoteInfo;
      const createdAt: Date = data.createdAt.toDate();
      const updatedAt: Date = data.updatedAt.toDate();

      const note: Note = { ...noteOtherThanDate, createdAt, updatedAt };

      return note;
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

  const removeNote = useCallback(
    (id: string) => {
      notesRef.doc(id).delete();
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

  const moveNote = useCallback(
    (noteId: string, destGenreId: string) => {
      notesRef.doc(noteId).update({
        genreId: destGenreId,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    },
    [notesRef],
  );

  return { notes, addNote, removeNote, updateNote, moveNote };
};

export { useNotes, createDefaultSearchNotesCriteria, createDefaultNoteField };
