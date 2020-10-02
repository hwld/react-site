import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';
import { db, firebase } from './firebaseConfig';
import { getDefaultNotesSortOrder, NoteService, NotesSortOrder } from './notes';
import { AppStateService } from './appState';

// types
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
  notesSortOrder: NotesSortOrder;
};

type FirestoreGenreInfo = {
  id: string;
  // 親が存在しない場合は自分自身への参照にする
  parentGenreRef: firebase.firestore.DocumentReference;
  childrenGenreRefs: firebase.firestore.DocumentReference[];
  notesSortOrder: NotesSortOrder;
};

export type Genre = GenreField & GenreDate & GenreInfo;

type FirestoreGenre = GenreField & FirestoreGenreDate & FirestoreGenreInfo;

export type GenreService = {
  genres: Genre[];
  addGenre: (parentGenreId: string, genreField: GenreField) => void;
  removeGenres: (id: string[]) => void;
  updateGenre: (genre: GenreField & { id: string }) => void;
  updateNotesSortOrderInGenre: (order: NotesSortOrder & { id: string }) => void;
  moveGenres: (genreId: string[], destGenreId: string) => void;
};

// default value
export const getDefaultGenre = (): Genre => ({
  id: '',
  genreName: '',
  parentGenreId: '',
  childrenGenreIds: [],
  createdAt: new Date(),
  notesSortOrder: getDefaultNotesSortOrder(),
});

export const getDefaultGenreService = (): GenreService => ({
  genres: [],

  addGenre: () => {},
  removeGenres: () => {},
  updateGenre: () => {},
  updateNotesSortOrderInGenre: () => {},
  moveGenres: () => {},
});

// hook
export const useGenres = (
  uid: string,
  noteService: NoteService,
  appState: AppStateService,
): GenreService => {
  const genresRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('genres');
  }, [uid]);

  const [genresCollection] = useCollectionData<FirestoreGenre>(genresRef);

  // firestore用のデータからapp用のデータに変換する
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
        notesSortOrder: genre.notesSortOrder,
      };
    });
  }, [genresCollection]);

  const { notes, removeNotes } = noteService;

  // 指定されたIdのジャンルの子孫ノードのidを再帰的に取得する.
  const getDescendantsGenreIds = useCallback(
    (parentId: string) => {
      const parentGenre = genres.find(genre => genre.id === parentId);
      if (!parentGenre) return [];

      const childrenIds = parentGenre.childrenGenreIds;

      const grandChildrenIds: string[] = childrenIds.flatMap(id => {
        if (id !== '') {
          return getDescendantsGenreIds(id);
        }

        return [];
      });

      return [...childrenIds, ...grandChildrenIds];
    },
    [genres],
  );

  // 指定されたジャンルIdのメモidを配列にして全て返す
  const getNotesByGenreIds = useCallback(
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
        notesSortOrder: getDefaultNotesSortOrder(),
      };
      newGenreRef.set(newGenre);
    },
    [genresRef],
  );

  const removeGenres = useCallback(
    (ids: string[]) => {
      const batch = db.batch();
      const childrenIds = ids.flatMap(id => getDescendantsGenreIds(id));
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
      removeNotes(getNotesByGenreIds(deletedGenreIds));

      batch.commit();

      // appStateのgenre関連を設定する
      const newSelected = appState.selectedGenreIds.filter(id => {
        return !deletedGenreIds.includes(id);
      });
      appState.setSelectedGenreIds(newSelected);

      const newExpanded = appState.expandedIds.filter(id => {
        return !deletedGenreIds.includes(id);
      });
      appState.setExpandedIds(newExpanded);
    },
    [
      genres,
      removeNotes,
      getNotesByGenreIds,
      appState,
      getDescendantsGenreIds,
      genresRef,
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

  const updateNotesSortOrderInGenre = useCallback(
    (order: NotesSortOrder & { id: string }) => {
      const newOrder: NotesSortOrder = {
        order: order.order,
        targetField: order.targetField,
      };

      genresRef.doc(order.id).update({ notesSortOrder: newOrder });
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

        // 移動先ジャンルがrootでなければchildrenを設定して、移動先ジャンルのrefをparentGenreRefに設定
        if (destGenreId !== '') {
          batch.update(genresRef.doc(destGenreId), {
            childrenGenreRefs: firebase.firestore.FieldValue.arrayUnion(
              genresRef.doc(genre.id),
            ),
          });
          batch.update(genresRef.doc(genre.id), {
            parentGenreRef: genresRef.doc(destGenreId),
          });
        } else {
          // 移動先ジャンルがrootの場合は自分自身をparentGenreRefに設定
          batch.update(genresRef.doc(genre.id), {
            parentGenreRef: genresRef.doc(genre.id),
          });
        }
      });

      batch.commit();
    },
    [genres, genresRef],
  );

  return {
    genres,
    addGenre,
    removeGenres,
    updateGenre,
    updateNotesSortOrderInGenre,
    moveGenres,
  };
};
