import { firestore } from 'firebase-admin';
import { db } from './firebaseConfig';
import { runBatch } from './runBatch';
import { Category } from '../../src/services/categories';

async function addNotseSortOrder(store: firestore.Firestore, limit: number) {
  const categoriesQuery = store
    .collectionGroup('categories')
    .orderBy('createdAt', 'asc');

  const executeAddNotesSortOrder = async (
    batch: firestore.WriteBatch,
    category: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => {
    const categoryData = category.data() as Category;
    if (categoryData.notesSortOrder === undefined) {
      batch.update(category.ref, {
        notesSortOrder: { order: 'asc', targetField: 'text' },
      });
    }
  };

  runBatch(store, categoriesQuery, executeAddNotesSortOrder, limit);
}

async function main() {
  console.log('start addNoteField');
  const limit = 100;
  await addNotseSortOrder(db, limit);
}

main().then(() => {
  console.log('end addNoteField');
});
