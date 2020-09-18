import { firestore } from 'firebase-admin';
import { db, admin } from './firebaseConfig';
import { runBatch } from './runBatch';

async function deleteNoteField(store: firestore.Firestore, limit: number) {
  const notesQuery = store.collectionGroup('notes').orderBy('createdAt', 'asc');

  const executeDeleteNoteField = (
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
  console.log('***** START MAIN *****');
  const limit = 25;
  deleteNoteField(db, limit);
  console.log('***** END MAIN *****');
}

main().then();
