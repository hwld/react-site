import { db } from 'services/firebaseConfig';
import firebase from 'firebase/app';
import { Genre, GenreField } from 'stores/store';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';

const useGenres = (uid: string) => {
  const genresRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid}`)
      .collection('Genres');
  }, [uid]);

  const memosRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid}`)
      .collection('Memos');
  }, [uid]);

  const [genresCollection] = useCollection(genresRef);
  const genres = useMemo(
    () =>
      genresCollection?.docs.map(genreDoc => {
        return genreDoc.data();
      }),
    [genresCollection],
  );

  // 指定されたIdのジャンルの子ノードのidを再帰的に取得し、Promiseの配列にして返す.
  const fetchAllChildrenGenreIds = useCallback(
    async (parentId: string) => {
      const parentGenre = (await genresRef.doc(parentId).get()).data();
      if (!parentGenre) return [];

      // data()の戻り値にうまく形を付けたいけど取り敢えず後回しにした.
      const childrenIds: string[] = parentGenre.childrenGenreIds;

      const promiseGrandChildrenIds = childrenIds.map(id =>
        fetchAllChildrenGenreIds(id),
      );

      // 明示的に型を指定しないとanyになってしまう.
      const grandChildrenIds: string[] = (
        await Promise.all(promiseGrandChildrenIds)
      ).flat();

      return [...childrenIds, ...grandChildrenIds];
    },
    [genresRef],
  );

  // 指定されたジャンルIdのメモをPromiseの配列にして全て返す
  const fetchAllMemosInGenreIds = useCallback(
    async (genreIds: string[]) => {
      // memoを削除する
      const promiseMemoIds = genreIds.map(async genreId => {
        const deletedMemos: string[] = [];
        const memoDocs = await memosRef
          .where('genreId', '==', `${genreId}`)
          .get();
        memoDocs.forEach(memo => {
          deletedMemos.push(memo.data().id);
        });

        return deletedMemos;
      });

      return (await Promise.all(promiseMemoIds)).flat();
    },
    [memosRef],
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
      const deletedGenreIds = [id, ...childrenIds];

      // genreを削除する
      deletedGenreIds.forEach(genreId => {
        genresRef.doc(genreId).delete();
      });

      const deletedMemos = await fetchAllMemosInGenreIds(deletedGenreIds);
      deletedMemos.forEach(memoId => {
        memosRef.doc(memoId).delete();
      });
    },
    [fetchAllChildrenGenreIds, fetchAllMemosInGenreIds, genresRef, memosRef],
  );

  const updateGenre = useCallback(
    (id: string, genre: GenreField) => {
      genresRef.doc(id).update({ ...genre });
    },
    [genresRef],
  );

  return { genres, addGenre, removeGenre, updateGenre };
};

export { useGenres };
