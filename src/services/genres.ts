import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';
import { db } from './firebaseConfig';

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

  // 指定されたIdのジャンルの子ノードのidを再帰的に取得し、Promiseの配列にして返す.
  const fetchAllChildrenGenreIds = useCallback(
    async (parentId: string) => {
      const parentGenre = (await genresRef.doc(parentId).get()).data();
      if (!parentGenre) return [];

      // data()の戻り値にうまく形を付けたいけど取り敢えず後回しにした.
      const childrenIds: string[] = parentGenre.childrenGenreIds;

      const promiseGrandChildrenIds = childrenIds.map(id => {
        if (id !== '') {
          return fetchAllChildrenGenreIds(id);
        }

        return [];
      });

      // 明示的に型を指定しないとanyになってしまう.
      const grandChildrenIds: string[] = (
        await Promise.all(promiseGrandChildrenIds)
      ).flat();

      return [...childrenIds, ...grandChildrenIds];
    },
    [genresRef],
  );

  // 指定されたジャンルIdのメモをPromiseの配列にして全て返す
  const fetchAllNotesInGenreIds = useCallback(
    async (genreIds: string[]) => {
      const promiseNoteIds = genreIds.map(async genreId => {
        const deletedNotes: string[] = [];

        const noteDocs = await notesRef
          .where('genreId', '==', `${genreId}`)
          .get();
        noteDocs.forEach(note => {
          deletedNotes.push(note.data().id);
        });

        return deletedNotes;
      });

      return (await Promise.all(promiseNoteIds)).flat();
    },
    [notesRef],
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
    async (id: string) => {
      const childrenIds = await fetchAllChildrenGenreIds(id);
      const deletedGenreIds = [id, ...childrenIds];

      // genreを削除する
      deletedGenreIds.forEach(genreId => {
        genresRef.doc(genreId).delete();
      });

      const deletedNotes = await fetchAllNotesInGenreIds(deletedGenreIds);
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

  return { genres, addGenre, removeGenre, updateGenre };
};

export { useGenres };
