import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onDeleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    const batch = admin.firestore().batch();

    const userDoc = admin.firestore().doc(`users/${user.uid}`);
    batch.delete(userDoc);

    const subcollections = await userDoc.listCollections();
    await Promise.all(
      subcollections.map(async collection => {
        const snapShot = await collection.get();
        snapShot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
      }),
    );

    batch
      .commit()
      .then()
      .catch();
  });
