import { firestore } from 'firebase-admin';

export async function runBatch(
  store: firestore.Firestore,
  query: firestore.Query<firestore.DocumentData>,
  execute: (
    batch: firestore.WriteBatch,
    doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => void,
  limit: number,
  last?: firestore.DocumentSnapshot,
) {
  let newQuery = query;
  if (last) {
    newQuery = newQuery.startAfter(last);
  }
  newQuery = newQuery.limit(limit);

  const querySnapshot = await newQuery.get();
  if (querySnapshot.empty) {
    return;
  }

  const batch = store.batch();
  querySnapshot.forEach(doc => execute(batch, doc));
  batch.commit();

  runBatch(
    store,
    query,
    execute,
    limit,
    querySnapshot.docs[querySnapshot.docs.length - 1],
  );
}
