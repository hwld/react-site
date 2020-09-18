import { db } from './firebaseConfig';

async function getNotes() {
  try {
    const ref = db.collectionGroup('notes');
    const snapshot = await ref.get();

    return snapshot.docs.map(s => s.data());
  } catch (e) {
    throw new Error(e);
  }
}

async function main() {
  try {
    console.log('***** START MAIN *****');
    const notes = await getNotes();
    notes.forEach(n => console.log(`title=${n.title}`));
    console.log(notes.length);
    console.log('***** END MAIN *****');
  } catch (e) {
    console.log(e);
  }
}

main().then();
