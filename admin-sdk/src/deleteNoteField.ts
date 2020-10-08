import { firestore } from 'firebase-admin';
import { db, admin } from './firebaseConfig';
import { runBatch } from './runBatch';

async function deleteAuthorAndBookName(
  store: firestore.Firestore,
  limit: number,
) {
  const notesQuery = store.collectionGroup('notes').orderBy('createdAt', 'asc');

  const executeDeleteNoteField = async (
    batch: firestore.WriteBatch,
    note: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => {
    batch.update(note.ref, {
      authorName: admin.firestore.FieldValue.delete(),
      bookName: admin.firestore.FieldValue.delete(),
    });
  };

  runBatch(store, notesQuery, executeDeleteNoteField, limit);
}

async function main() {
  console.log('start deleteNoteField');
  const limit = 100;
  await deleteAuthorAndBookName(db, limit);
}

main().then(() => {
  console.log('end deleteNoteField');
});
