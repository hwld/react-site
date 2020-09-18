import { db, admin } from './firebaseConfig';



async function getNotesSnapShot() {
  const ref = db.collectionGroup('notes');
  const snapshot = await ref.get();

  return snapshot;
}

async function deleteNoteField() {
  try {
    console.log('***** START MAIN *****');
    const notes = await getNotesSnapShot();
    notes.docs.forEach(n => {
      n.ref.update({
        authorName: admin.firestore.FieldValue.delete(),
        bookName: admin.firestore.FieldValue.delete(),
      });
    });
    console.log('***** END MAIN *****');
  } catch (e) {
    console.log(e);
  }
}

deleteNoteField().then();
