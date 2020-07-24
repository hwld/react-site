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

type FirestoreGenreInfo = {
  id: string;
  parentGenreId: string;
};

export type Genre = GenreField & GenreDate & GenreInfo;
type FirestoreGenre = GenreField & FirestoreGenreDate & FirestoreGenreInfo;

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

  const getAllGenres = useCallback(() => {
    if (!genresCollection) {
      return Promise.resolve([]);
    }

    return Promise.all(
      genresCollection.docs.map(async genreDoc => {
        const data = genreDoc.data() as FirestoreGenre;

        // 子ジャンルを取得
        const childrenCollection = await genreDoc.ref
          .collection('childrenGenres')
          .get();
        const childrenGenreIds = childrenCollection.docs.map(doc => doc.id);

        // Genre型のcreatedAtだけTimestampからDateに変換したい
        const createdAt: Date = data.createdAt.toDate();

        const genre: Genre = {
          id: data.id,
          genreName: data.genreName,
          parentGenreId: data.parentGenreId,
          createdAt,
          childrenGenreIds,
        };

        return genre;
      }),
    );
  }, [genresCollection]);

  const { notes, removeNotes } = useNotes(uid);

  // 指定されたIdのジャンルの子ノードのidを再帰的に取得する.
  const fetchAllChildrenGenreIds = useCallback(
    async (parentId: string) => {
      const parentGenre = (await getAllGenres()).find(
        genre => genre.id === parentId,
      );
      if (!parentGenre) return [];

      const childrenIds = parentGenre.childrenGenreIds;

      const grandChildrenIds: string[] = (
        await Promise.all(
          childrenIds.map(id => {
            if (id !== '') {
              return fetchAllChildrenGenreIds(id);
            }

            return Promise.resolve([]);
          }),
        )
      ).flat();

      return [...childrenIds, ...grandChildrenIds];
    },
    [getAllGenres],
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
        parentGenreRef
          .collection('childrenGenres')
          .doc(newGenreRef.id)
          .set({});
      }

      const newGenre: FirestoreGenre = {
        genreName: genreField.genreName,
        parentGenreId,
        id: newGenreRef.id,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      newGenreRef.set(newGenre);
    },
    [genresRef],
  );

  const removeGenres = useCallback(
    async (ids: string[]) => {
      const batch = db.batch();
      const childrenIds = (
        await Promise.all(ids.map(id => fetchAllChildrenGenreIds(id)))
      ).flat();
      // 親子関係にあるジャンルを削除しようとした場合に重複するので排除する
      const deletedGenreIds = Array.from(new Set([...ids, ...childrenIds]));

      // 指定されたジャンルの親がrootじゃない場合,親のchildrenからジャンルを削除する
      const genreIds = deletedGenreIds.filter(id => !childrenIds.includes(id));
      (await getAllGenres())
        .filter(genre => genreIds.includes(genre.id))
        .forEach(genre => {
          if (genre.parentGenreId !== '') {
            batch.delete(
              genresRef
                .doc(genre.parentGenreId)
                .collection('childrenGenres')
                .doc(genre.id),
            );
          }
        });

      // genreを削除する
      await Promise.all(
        deletedGenreIds.map(async id => {
          // genreのchildrenGenresサブコレクションを削除する
          const childrenGenresRef = await genresRef
            .doc(id)
            .collection('childrenGenres')
            .get();

          childrenGenresRef.docs.forEach(genreDoc => {
            batch.delete(genreDoc.ref);
          });

          batch.delete(genresRef.doc(id));
        }),
      );

      // noteを削除する
      removeNotes(fetchAllNotesInGenreIds(deletedGenreIds));

      batch.commit();
    },
    [
      fetchAllChildrenGenreIds,
      fetchAllNotesInGenreIds,
      genresRef,
      getAllGenres,
      removeNotes,
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

  const moveGenres = useCallback(
    async (ids: string[], destGenreId: string | '') => {
      const batch = db.batch();
      const sourceGenres = (await getAllGenres()).filter(genre =>
        ids.includes(genre.id),
      );

      sourceGenres.forEach(genre => {
        // 移動元のジャンルの親がrootじゃない場合、childrenから移動元のジャンルを削除する
        if (genre.parentGenreId !== '') {
          batch.delete(
            genresRef
              .doc(genre.parentGenreId)
              .collection('childrenGenres')
              .doc(genre.id),
          );
        }

        // ジャンルの移動
        batch.update(genresRef.doc(genre.id), { parentGenreId: destGenreId });

        // 移動先ジャンルがrootでなければchildrenを設定する
        if (destGenreId !== '') {
          batch.set(
            genresRef
              .doc(destGenreId)
              .collection('childrenGenres')
              .doc(genre.id),
            {},
          );
        }
      });

      batch.commit();
    },
    [genresRef, getAllGenres],
  );

  return { getAllGenres, addGenre, removeGenres, updateGenre, moveGenres };
};

export { useGenres, defaultGenreField };
