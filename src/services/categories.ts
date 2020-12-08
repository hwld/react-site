import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useCallback, useMemo } from 'react';
import { getDefaultNotesSortOrder, NoteService, NotesSortOrder } from './notes';
import { AppStateService } from './appState';
import { db, firebase } from '../firebaseConfig';

// types
export type CategoryField = {
  categoryName: string;
};

export type CategoryDate = {
  createdAt: Date;
};

type FirestoreCategoryDate = {
  createdAt: firebase.firestore.Timestamp;
};

export type CategoryInfo = {
  id: string;
  parentCategoryId: string;
  // 直接の子カテゴリーのみをもたせる
  childrenCategoryIds: string[];
  notesSortOrder: NotesSortOrder;
};

type FirestoreCategoryInfo = {
  id: string;
  // 親が存在しない場合は自分自身への参照にする
  parentCategoryRef: firebase.firestore.DocumentReference;
  childrenCategoryRefs: firebase.firestore.DocumentReference[];
  notesSortOrder: NotesSortOrder;
};

export type Category = CategoryField & CategoryDate & CategoryInfo;

export type FirestoreCategory = CategoryField &
  FirestoreCategoryDate &
  FirestoreCategoryInfo;

export type CategoryService = {
  categories: Category[];
  addCategory: (parentCategoryId: string, categoryField: CategoryField) => void;
  removeCategories: (id: string[]) => void;
  updateCategory: (category: CategoryField & { id: string }) => void;
  updateNotesSortOrderInCategory: (
    order: NotesSortOrder & { id: string },
  ) => void;
  moveCategories: (categoryId: string[], destCategoryId: string) => void;
};

// default value
export const getDefaultCategory = (): Category => ({
  id: '',
  categoryName: '',
  parentCategoryId: '',
  childrenCategoryIds: [],
  createdAt: new Date(),
  notesSortOrder: getDefaultNotesSortOrder(),
});

export const getDefaultCategoryService = (): CategoryService => ({
  categories: [],

  addCategory: () => {},
  removeCategories: () => {},
  updateCategory: () => {},
  updateNotesSortOrderInCategory: () => {},
  moveCategories: () => {},
});

// hook
export const useCategories = (
  uid: string,
  noteService: NoteService,
  appState: AppStateService,
): CategoryService => {
  const categoriesRef = useMemo(() => {
    return db
      .collection('users')
      .doc(`${uid !== '' ? uid : 'tmp'}`)
      .collection('categories');
  }, [uid]);

  const [categoriesCollection] = useCollectionData<FirestoreCategory>(
    categoriesRef,
  );

  // firestore用のデータからapp用のデータに変換する
  const categories = useMemo(() => {
    if (!categoriesCollection) {
      return [];
    }

    return categoriesCollection.map<Category>(category => {
      return {
        id: category.id,
        categoryName: category.categoryName,
        parentCategoryId:
          category.parentCategoryRef.id !== category.id
            ? category.parentCategoryRef.id
            : '',
        childrenCategoryIds: category.childrenCategoryRefs.map(ref => ref.id),
        createdAt: category.createdAt.toDate(),
        notesSortOrder: category.notesSortOrder,
      };
    });
  }, [categoriesCollection]);

  const { notes, removeNotes } = noteService;

  // 指定されたIdのカテゴリーの子孫ノードのidを再帰的に取得する.
  const getDescendantsCategoryIds = useCallback(
    (parentId: string) => {
      const parentCategory = categories.find(
        category => category.id === parentId,
      );
      if (!parentCategory) return [];

      const childrenIds = parentCategory.childrenCategoryIds;

      const grandChildrenIds: string[] = childrenIds.flatMap(id => {
        if (id !== '') {
          return getDescendantsCategoryIds(id);
        }

        return [];
      });

      return [...childrenIds, ...grandChildrenIds];
    },
    [categories],
  );

  // 指定されたカテゴリーIdのメモidを配列にして全て返す
  const getNotesByCategoryIds = useCallback(
    (categoryIds: string[]) => {
      return categoryIds.flatMap(categoryId => {
        return notes
          .filter(note => note.categoryId === categoryId)
          .map(note => note.id);
      });
    },
    [notes],
  );

  const addCategory = useCallback(
    (parentCategoryId: string, categoryField: CategoryField) => {
      const newCategoryRef = categoriesRef.doc();

      if (parentCategoryId !== '') {
        // 親カテゴリーの子カテゴリーidのリストを更新する
        const parentCategoryRef = categoriesRef.doc(parentCategoryId);
        parentCategoryRef.update({
          childrenCategoryRefs: firebase.firestore.FieldValue.arrayUnion(
            newCategoryRef,
          ),
        });
      }

      const newCategory: FirestoreCategory = {
        id: newCategoryRef.id,
        categoryName: categoryField.categoryName,
        parentCategoryRef:
          parentCategoryId !== ''
            ? categoriesRef.doc(parentCategoryId)
            : categoriesRef.doc(newCategoryRef.id),
        childrenCategoryRefs: [],
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        notesSortOrder: getDefaultNotesSortOrder(),
      };
      newCategoryRef.set(newCategory);
    },
    [categoriesRef],
  );

  const removeCategories = useCallback(
    (ids: string[]) => {
      const batch = db.batch();
      const childrenIds = ids.flatMap(id => getDescendantsCategoryIds(id));
      // 親子関係にあるカテゴリーを削除しようとした場合に重複するので排除する
      const deletedCategoryIds = Array.from(new Set([...ids, ...childrenIds]));

      // 指定されたカテゴリーの親がrootじゃない場合,親のchildrenからカテゴリーを削除する
      const categoryIds = deletedCategoryIds.filter(
        id => !childrenIds.includes(id),
      );
      categories
        .filter(category => categoryIds.includes(category.id))
        .forEach(category => {
          if (category.parentCategoryId !== '') {
            batch.update(categoriesRef.doc(category.parentCategoryId), {
              childrenCategoryRefs: firebase.firestore.FieldValue.arrayRemove(
                categoriesRef.doc(category.id),
              ),
            });
          }
        });

      // categoryを削除する
      deletedCategoryIds.forEach(id => {
        batch.delete(categoriesRef.doc(id));
      });

      // noteを削除する
      removeNotes(getNotesByCategoryIds(deletedCategoryIds));

      batch.commit();

      // appStateのcategory関連を設定する
      const newSelected = appState.selectedCategoryIds.filter(id => {
        return !deletedCategoryIds.includes(id);
      });
      appState.setSelectedCategoryIds(newSelected);

      const newExpanded = appState.expandedIds.filter(id => {
        return !deletedCategoryIds.includes(id);
      });
      appState.setExpandedIds(newExpanded);
    },
    [
      categories,
      removeNotes,
      getNotesByCategoryIds,
      appState,
      getDescendantsCategoryIds,
      categoriesRef,
    ],
  );

  const updateCategory = useCallback(
    (category: CategoryField & { id: string }) => {
      // スプレッド演算子使うと categoryにCategory型のサブタイプが渡されたときに更新したくないプロパティまで更新される
      const newCategory: CategoryField = {
        categoryName: category.categoryName,
      };

      categoriesRef.doc(category.id).update(newCategory);
    },
    [categoriesRef],
  );

  const updateNotesSortOrderInCategory = useCallback(
    (order: NotesSortOrder & { id: string }) => {
      const newOrder: NotesSortOrder = {
        order: order.order,
        targetField: order.targetField,
      };

      categoriesRef.doc(order.id).update({ notesSortOrder: newOrder });
    },
    [categoriesRef],
  );

  const moveCategories = useCallback(
    (ids: string[], destCategoryId: string | '') => {
      const batch = db.batch();
      const sourceCategories = categories.filter(category =>
        ids.includes(category.id),
      );

      sourceCategories.forEach(category => {
        // 移動元のカテゴリーの親がrootじゃない場合、childrenから移動元のカテゴリーを削除する
        if (category.parentCategoryId !== '') {
          batch.update(categoriesRef.doc(category.parentCategoryId), {
            childrenCategoryRefs: firebase.firestore.FieldValue.arrayRemove(
              categoriesRef.doc(category.id),
            ),
          });
        }

        // 移動先カテゴリーがrootでなければchildrenを設定して、移動先カテゴリーのrefをparentCategoryRefに設定
        if (destCategoryId !== '') {
          batch.update(categoriesRef.doc(destCategoryId), {
            childrenCategoryRefs: firebase.firestore.FieldValue.arrayUnion(
              categoriesRef.doc(category.id),
            ),
          });
          batch.update(categoriesRef.doc(category.id), {
            parentCategoryRef: categoriesRef.doc(destCategoryId),
          });
        } else {
          // 移動先カテゴリーがrootの場合は自分自身をparentCategoryRefに設定
          batch.update(categoriesRef.doc(category.id), {
            parentCategoryRef: categoriesRef.doc(category.id),
          });
        }
      });

      batch.commit();
    },
    [categories, categoriesRef],
  );

  return {
    categories,
    addCategory,
    removeCategories,
    updateCategory,
    updateNotesSortOrderInCategory,
    moveCategories,
  };
};
