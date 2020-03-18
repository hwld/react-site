import { db } from 'services/firebaseConfig';
import firebase from 'firebase/app';
import { Genre, GenreField } from 'stores/store';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useCallback } from 'react';

const useGenres = (uid: string) => {
  const genresRef = db
    .collection('users')
    .doc(`${uid}`)
    .collection('Genres');

  const [genres] = useCollection(genresRef);

  // 指定されたIdのジャンルの子ノードのidを再帰的に取得し、配列にして返す.
  const fetchAllChildrenGenreIds = useCallback(
    async (parentId: string) => {
      const parentGenre = (await genresRef.doc(parentId).get()).data();
      if (!parentGenre) return [];

      // data()の戻り値にうまく形を付けたいけど取り敢えず後回しにした.
      const childrenIds: string[] = parentGenre.data().childrenGenreIds;

      const grandChildrenIds = childrenIds.map(id =>
        fetchAllChildrenGenreIds(id),
      );

      // 明示的に型を指定しないとanyになってしまう.
      const ids: string[] = (await Promise.all(grandChildrenIds)).flat();

      return [...childrenIds, ...ids];
    },
    [genresRef],
  );

  const addGenre = useCallback(
    (genre: Genre) => {
      const newGenreRef = genresRef.doc();

      const parentGenreRef = genresRef.doc(genre.parentGenreId);
      parentGenreRef.update({
        childrenGenreIds: firebase.firestore.FieldValue.arrayUnion(genre.id),
      });

      newGenreRef.set({ ...genre, id: newGenreRef.id });
    },
    [genresRef],
  );

  const removeGenre = useCallback(
    async (id: string) => {
      const childrenIds = await fetchAllChildrenGenreIds(id);
      childrenIds.forEach(childId => {
        genresRef.doc(childId).delete();
      });

      genresRef.doc(id).delete();
    },
    [fetchAllChildrenGenreIds, genresRef],
  );

  const updateGenre = useCallback(
    (id: string, genre: GenreField) => {
      genresRef.doc(id).update({ ...genre });
    },
    [genresRef],
  );

  return { genres, addGenre, removeGenre };
};

export { useGenres };
