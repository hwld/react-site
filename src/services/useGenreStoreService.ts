import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';
import { db } from './firebaseConfig';
import { useNoteStoreService } from './useNoteStoreService';
import { GenreField, Genre, GenreStoreService } from '../types/genre';

type FirestoreGenreDate = {
  createdAt: firebase.firestore.Timestamp;
};

type FirestoreGenreInfo = {
  id: string;
  // 親が存在しない場合は自分自身への参照にする
  parentGenreRef: firebase.firestore.DocumentReference;
  childrenGenreRefs: firebase.firestore.DocumentReference[];
};

type FirestoreGenre = GenreField & FirestoreGenreDate & FirestoreGenreInfo;

export const useGenreStoreService = (uid: string): GenreStoreService => {
  const genresRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('genres');
  }, [uid]);

  const [genresCollection] = useCollectionData<FirestoreGenre>(genresRef);
  const genres = useMemo(() => {
    if (!genresCollection) {
      return [];
    }

    return genresCollection.map<Genre>(genre => {
      return {
        id: genre.id,
        genreName: genre.genreName,
        parentGenreId:
          genre.parentGenreRef.id !== genre.id ? genre.parentGenreRef.id : '',
        childrenGenreIds: genre.childrenGenreRefs.map(ref => ref.id),
        createdAt: genre.createdAt.toDate(),
      };
    });
  }, [genresCollection]);

  const { notes, removeNotes } = useNoteStoreService(uid);

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
          childrenGenreRefs: firebase.firestore.FieldValue.arrayUnion(
            newGenreRef,
          ),
        });
      }

      const newGenre: FirestoreGenre = {
        id: newGenreRef.id,
        genreName: genreField.genreName,
        parentGenreRef:
          parentGenreId !== ''
            ? genresRef.doc(parentGenreId)
            : genresRef.doc(newGenreRef.id),
        childrenGenreRefs: [],
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      newGenreRef.set(newGenre);
    },
    [genresRef],
  );

  const removeGenres = useCallback(
    (ids: string[]) => {
      const batch = db.batch();
      const childrenIds = ids.flatMap(id => fetchAllChildrenGenreIds(id));
      // 親子関係にあるジャンルを削除しようとした場合に重複するので排除する
      const deletedGenreIds = Array.from(new Set([...ids, ...childrenIds]));

      // 指定されたジャンルの親がrootじゃない場合,親のchildrenからジャンルを削除する
      const genreIds = deletedGenreIds.filter(id => !childrenIds.includes(id));
      genres
        .filter(genre => genreIds.includes(genre.id))
        .forEach(genre => {
          if (genre.parentGenreId !== '') {
            batch.update(genresRef.doc(genre.parentGenreId), {
              childrenGenreRefs: firebase.firestore.FieldValue.arrayRemove(
                genresRef.doc(genre.id),
              ),
            });
          }
        });

      // genreを削除する
      deletedGenreIds.forEach(id => {
        batch.delete(genresRef.doc(id));
      });

      // noteを削除する
      removeNotes(fetchAllNotesInGenreIds(deletedGenreIds));

      batch.commit();
    },
    [
      fetchAllChildrenGenreIds,
      fetchAllNotesInGenreIds,
      genres,
      genresRef,
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
    (ids: string[], destGenreId: string | '') => {
      const batch = db.batch();
      const sourceGenres = genres.filter(genre => ids.includes(genre.id));

      sourceGenres.forEach(genre => {
        // 移動元のジャンルの親がrootじゃない場合、childrenから移動元のジャンルを削除する
        if (genre.parentGenreId !== '') {
          batch.update(genresRef.doc(genre.parentGenreId), {
            childrenGenreRefs: firebase.firestore.FieldValue.arrayRemove(
              genresRef.doc(genre.id),
            ),
          });
        }

        // ジャンルの移動
        batch.update(genresRef.doc(genre.id), { parentGenreId: destGenreId });

        // 移動先ジャンルがrootでなければchildrenを設定する
        if (destGenreId !== '') {
          batch.update(genresRef.doc(destGenreId), {
            childrenGenreRefs: firebase.firestore.FieldValue.arrayUnion(
              genresRef.doc(genre.id),
            ),
          });
        }
      });

      batch.commit();
    },
    [genres, genresRef],
  );

  return { genres, addGenre, removeGenres, updateGenre, moveGenres };
};
