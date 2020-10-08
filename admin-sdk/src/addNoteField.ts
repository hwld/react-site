import { firestore } from 'firebase-admin';
import { db } from './firebaseConfig';
import { runBatch } from './runBatch';
import { Genre } from '../../src/services/categories';

async function addNotseSortOrder(store: firestore.Firestore, limit: number) {
  const genresQuery = store
    .collectionGroup('genres')
    .orderBy('createdAt', 'asc');

  const executeAddNotesSortOrder = async (
    batch: firestore.WriteBatch,
    genre: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => {
    const genreData = genre.data() as Genre;
    if (genreData.notesSortOrder === undefined) {
      batch.update(genre.ref, {
        notesSortOrder: { order: 'asc', targetField: 'text' },
      });
    }
  };

  runBatch(store, genresQuery, executeAddNotesSortOrder, limit);
}

async function main() {
  console.log('start addNoteField');
  const limit = 100;
  await addNotseSortOrder(db, limit);
}

main().then(() => {
  console.log('end addNoteField');
});
