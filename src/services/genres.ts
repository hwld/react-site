import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';
import { db } from './firebaseConfig';
import { Note, NoteField, NoteInfo } from './notes';

export interface GenreField {
  genreName: string;
}

export interface GenreDate {
  creationDate: Date;
}

export interface GenreInfo {
  id: string;
  parentGenreId: string;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
}

export type Genre = GenreField & GenreDate & GenreInfo;

export const createDefaultGenre = () => {
  return {
    id: '',
    creationDate: new Date(),
    genreName: '',
    parentGenreId: '',
    childrenGenreIds: [],
  };
};

const useGenres = (uid: string) => {
  const genresRef = useMemo(() => {
    if (uid !== '') {
      return db
        .collection('users')
        .doc(`${uid}`)
        .collection('genres');
    }

    return db
      .collection('users')
      .doc()
      .collection('damy');
  }, [uid]);
  const [genresCollection] = useCollection(genresRef);
  const genres = useMemo(() => {
    if (!genresCollection) {
      return [];
    }

    return genresCollection.docs.map(genreDoc => {
      const data = genreDoc.data();

      // Genre型のcreationDateだけTimestampからDateに変換したい
      const genreOtherThanDate = data as GenreField & GenreInfo;
      const creationDate: Date = data.creationDate.toDate();

      const genre: Genre = { ...genreOtherThanDate, creationDate };

      return genre;
    });
  }, [genresCollection]);

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

  // 指定されたIdのジャンルの子ノードのidを再帰的に取得する.
  const fetchAllChildrenGenreIds = useCallback(
    (parentId: string) => {
      const parentGenre = genres.find(genre => genre.id === parentId);
      if (!parentGenre) return [];

      const childrenIds = parentGenre.childrenGenreIds;

      const grandChildrenIds: string[] = childrenIds.flatMap(id => {
        if (id !== '') {
          return fetchAllChildrenGenreIds(id);
        }

        return [];
      });

      return [...childrenIds, ...grandChildrenIds];
    },
    [genres],
  );

  // 指定されたジャンルIdのメモをPromiseの配列にして全て返す
  const fetchAllNotesInGenreIds = useCallback(
    (genreIds: string[]) => {
      return genreIds.flatMap(genreId => {
        const notesIdInGenre = notes
          .filter(note => note.genreId === genreId)
          .map(note => note.id);

        return notesIdInGenre;
      });
    },
    [notes],
  );

  const addGenre = useCallback(
    (genre: Genre) => {
      const newGenreRef = genresRef.doc();

      if (genre.parentGenreId !== '') {
        // 親ジャンルの子ジャンルidのリストを更新する
        const parentGenreRef = genresRef.doc(genre.parentGenreId);
        parentGenreRef.update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayUnion(
            newGenreRef.id,
          ),
        });
      }

      newGenreRef.set({
        ...genre,
        id: newGenreRef.id,
        creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    },
    [genresRef],
  );

  const removeGenre = useCallback(
    (id: string) => {
      const childrenIds = fetchAllChildrenGenreIds(id);
      const deletedGenreIds = [id, ...childrenIds];

      // genreを削除する
      deletedGenreIds.forEach(genreId => {
        genresRef.doc(genreId).delete();
      });

      // noteを削除する
      const deletedNotes = fetchAllNotesInGenreIds(deletedGenreIds);
      deletedNotes.forEach(noteId => {
        notesRef.doc(noteId).delete();
      });
    },
    [fetchAllChildrenGenreIds, fetchAllNotesInGenreIds, genresRef, notesRef],
  );

  const updateGenre = useCallback(
    (genre: Genre) => {
      genresRef.doc(genre.id).update({ ...genre });
    },
    [genresRef],
  );

  const moveGenre = useCallback(
    (genre: Genre, destGenreId: string | '') => {
      // 移動元ジャンルの親がrootじゃない場合、childrenから移動元ジャンルを削除する
      if (genre.parentGenreId !== '') {
        genresRef.doc(genre.parentGenreId).update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayRemove(genre.id),
        });
      }

      // 移動元ジャンルの親を移動先ジャンルに設定
      // 親がルート
      if (destGenreId === '') {
        genresRef.doc(genre.id).update({
          parentGenreId: '',
        });
      } else {
        genresRef.doc(genre.id).update({
          parentGenreId: destGenreId,
        });

        // 親がルートでなければchildrenも設定する
        genresRef.doc(destGenreId).update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayUnion(genre.id),
        });
      }
    },
    [genresRef],
  );

  return { genres, addGenre, removeGenre, updateGenre, moveGenre };
};

export { useGenres };
