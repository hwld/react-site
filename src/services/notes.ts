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
  creationDate: Date;
  lastUpdated: Date;
}

export interface NoteInfo {
  id: string;
  genreId: string;
}

export type Note = NoteField & NoteDate & NoteInfo;

export interface SearchNotesCriteria {
  genreId: string;
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

const useNotes = (uid: string) => {
  const notesRef = useMemo(() => {
    if (uid !== '') {
      return db
        .collection('users')
        .doc(`${uid}`)
        .collection('notes');
    }

    return db
      .collection('users')
      .doc()
      .collection('damy');
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
      const creationDate: Date = data.creationDate.toDate();
      const lastUpdated: Date = data.lastUpdated.toDate();

      const note: Note = { ...noteOtherThanDate, creationDate, lastUpdated };

      return note;
    });
  }, [notesCollection]);

  const addNote = useCallback(
    (note: Note) => {
      const newNoteRef = notesRef.doc();

      newNoteRef.set({
        ...note,
        id: newNoteRef.id,
        creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
      });
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
    (id: string, noteField: NoteField) => {
      notesRef.doc(id).update({
        ...noteField,
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    },
    [notesRef],
  );

  const moveNote = useCallback(
    (noteId: string, destGenreId: string) => {
      notesRef.doc(noteId).update({
        genreId: destGenreId,
        lastUpdated: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    },
    [notesRef],
  );

  return { notes, addNote, removeNote, updateNote, moveNote };
};

export { useNotes };
