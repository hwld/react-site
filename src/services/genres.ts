import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';
import { db } from './firebaseConfig';
import { useNotes } from './notes';

export type GenreField = {
  genreName: string;
};

export type GenreDate = {
  createdAt: Date;
};

type FirestoreGenreDate = {
  createdAt: firebase.firestore.Timestamp;
};

export type GenreInfo = {
  id: string;
  parentGenreId: string;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
};

export type Genre = GenreField & GenreDate & GenreInfo;
type FirestoreGenre = GenreField & FirestoreGenreDate & GenreInfo;

const defaultGenreField = () => {
  return { genreName: '' };
};

export const createDefaultGenre = () => {
  return {
    id: '',
    createdAt: new Date(),
    genreName: '',
    parentGenreId: '',
    childrenGenreIds: [],
  };
};

const useGenres = (uid: string) => {
  const genresRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('genres');
  }, [uid]);

  const [genresCollection] = useCollection(genresRef);
  const genres = useMemo(() => {
    if (!genresCollection) {
      return [];
    }

    return genresCollection.docs.map(genreDoc => {
      const data = genreDoc.data();

      // Genre型のcreatedAtだけTimestampからDateに変換したい
      const genreOtherThanDate = data as Genre;
      const createdAt: Date = data.createdAt.toDate();

      const genre: Genre = { ...genreOtherThanDate, createdAt };

      return genre;
    });
  }, [genresCollection]);

  const { notes, removeNote } = useNotes(uid);

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

  // 指定されたジャンルIdのメモidを配列にして全て返す
  const fetchAllNotesInGenreIds = useCallback(
    (genreIds: string[]) => {
      return genreIds.flatMap(genreId => {
        return notes
          .filter(note => note.genreId === genreId)
          .map(note => note.id);
      });
    },
    [notes],
  );

  const addGenre = useCallback(
    (parentGenreId: string, genreField: GenreField) => {
      const newGenreRef = genresRef.doc();

      if (parentGenreId !== '') {
        // 親ジャンルの子ジャンルidのリストを更新する
        const parentGenreRef = genresRef.doc(parentGenreId);
        parentGenreRef.update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayUnion(
            newGenreRef.id,
          ),
        });
      }

      const newGenre: FirestoreGenre = {
        genreName: genreField.genreName,
        parentGenreId,
        childrenGenreIds: [],
        id: newGenreRef.id,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      newGenreRef.set(newGenre);
    },
    [genresRef],
  );

  const removeGenre = useCallback(
    (id: string) => {
      const childrenIds = fetchAllChildrenGenreIds(id);
      const deletedGenreIds = [id, ...childrenIds];

      // 指定されたジャンルの親がrootじゃない場合、childrenからジャンルを削除する
      const genre = genres.find(g => g.id === id);
      if (!genre) throw Error('存在しないジャンルの削除');
      if (genre.parentGenreId !== '') {
        genresRef.doc(genre.parentGenreId).update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayRemove(genre.id),
        });
      }

      // genreを削除する
      deletedGenreIds.forEach(genreId => {
        genresRef.doc(genreId).delete();
      });

      // noteを削除する
      const deletedNotes = fetchAllNotesInGenreIds(deletedGenreIds);
      deletedNotes.forEach(noteId => {
        removeNote(noteId);
      });
    },
    [
      fetchAllChildrenGenreIds,
      fetchAllNotesInGenreIds,
      genres,
      genresRef,
      removeNote,
    ],
  );

  const updateGenre = useCallback(
    (genre: GenreField & { id: string }) => {
      // スプレッド演算子使うと genreにGenre型のサブタイプが渡されたときに更新したくないプロパティまで更新される
      const newGenre: GenreField = {
        genreName: genre.genreName,
      };

      genresRef.doc(genre.id).update(newGenre);
    },
    [genresRef],
  );

  const moveGenre = useCallback(
    (genreId: string, destGenreId: string | '') => {
      const sourceGenre = genres.find(genre => genre.id === genreId);
      if (!sourceGenre) {
        throw Error('ジャンルが存在しません');
      }

      // 移動元ジャンルの親がrootじゃない場合、childrenから移動元ジャンルを削除する
      if (sourceGenre.parentGenreId !== '') {
        genresRef.doc(sourceGenre.parentGenreId).update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayRemove(
            sourceGenre.id,
          ),
        });
      }

      genresRef.doc(sourceGenre.id).update({
        parentGenreId: destGenreId,
      });

      // 移動先がルートでなければchildrenも設定する
      if (destGenreId !== '') {
        genresRef.doc(destGenreId).update({
          childrenGenreIds: firebase.firestore.FieldValue.arrayUnion(
            sourceGenre.id,
          ),
        });
      }
    },
    [genres, genresRef],
  );

  return { genres, addGenre, removeGenre, updateGenre, moveGenre };
};

export { useGenres, defaultGenreField };
