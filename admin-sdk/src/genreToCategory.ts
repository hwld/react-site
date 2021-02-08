import { firestore } from 'firebase-admin';
import { db } from './firebaseConfig';
import { runBatch } from './runBatch';

// firestoreのgenreという名前をcategoryに変更する

async function genreToCategory(store: firestore.Firestore, limit: number) {
  const userRef = db.collection('users').doc('WmywdEF4YIfNBtYmH1dcsqnc2Mj1');

  const genresCollectionRef = userRef.collection('genres');
  const categoriesCollectionRef = userRef.collection('categories');
  const notesCollectionRef = userRef.collection('notes');

  const genresCollectionQuery = genresCollectionRef.orderBy('createdAt', 'asc');
  const categoriesCollectionQuery = categoriesCollectionRef.orderBy(
    'createdAt',
    'asc',
  );
  const notesCollectionQuery = notesCollectionRef.orderBy('createdAt', 'asc');

  // genresをもとにcategoriesサブコレクションを作成する
  // genreに,作成したcategorysのリファレンスを保持する
  const exeCreateCategoriesCollection = async (
    batch: firestore.WriteBatch,
    genreDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => {
    const genreData = genreDoc.data();
    const genreRef = genreDoc.ref;
    const categoryRef = categoriesCollectionRef.doc(genreDoc.id);

    const categoryData = {
      childrenGenreRefs: genreData.childrenGenreRefs,
      createdAt: genreData.createdAt,
      categoryName: genreData.genreName,
      id: genreData.id,
      notesSortOrder: genreData.notesSortOrder,
      parentGenreRef: genreData.parentGenreRef,
    };

    // genresからcategoriesサブコレクションを作成する
    batch.set(categoryRef, categoryData);

    // genresコレクションのgenreに対応するcategoriesの参照を一時的に持たせる
    batch.update(genreRef, {
      categoryRef,
    });
  };

  // categoryのchildrenGenreRefs,parentGenreRefをcategoryの参照に変更する
  const exeGenreToCategoryAtCategory = async (
    batch: firestore.WriteBatch,
    categoryDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => {
    const categoryData = categoryDoc.data();
    const categoryRef = categoryDoc.ref;

    const parentCategoryRef = (
      await (categoryData.parentGenreRef as firestore.DocumentReference).get()
    ).data()?.categoryRef;

    const childrenCategoryRefsPromises = (categoryData.childrenGenreRefs as firestore.DocumentReference[]).map(
      async ref => {
        return (await ref.get()).data()?.categoryRef;
      },
    );
    const childrenCategoryRefs = await Promise.all(
      childrenCategoryRefsPromises,
    );

    // parentGenreRefをparentCategoryRefに変更する
    batch.update(categoryRef, {
      parentGenreRef: firestore.FieldValue.delete(),
      parentCategoryRef,
    });

    // childrenGenreRefsをchildrenCategoryRefsに変更する
    batch.update(categoryRef, {
      childrenGenreRefs: firestore.FieldValue.delete(),
      childrenCategoryRefs,
    });
  };

  // noteのgenreRefをcategoryRefに変更する
  const exeGenreToCategoryAtNote = async (
    batch: firestore.WriteBatch,
    noteDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>,
  ) => {
    const noteRef = noteDoc.ref;
    const noteData = noteDoc.data();

    if (noteData.categoryRef) {
      return;
    }

    const categoryRef = (
      await (noteData.genreRef as firestore.DocumentReference).get()
    ).data()?.categoryRef;

    batch.update(noteRef, {
      genreRef: firestore.FieldValue.delete(),
      categoryRef,
    });
  };

  // genresからcategoriesにデータをコピーする
  await runBatch(
    store,
    genresCollectionQuery,
    exeCreateCategoriesCollection,
    limit,
  );
  // コピーしたcategoryのgenreと名前のつくものをcategoryに変更して、参照を正しく設定する
  await runBatch(
    store,
    categoriesCollectionQuery,
    exeGenreToCategoryAtCategory,
    limit,
  );
  // メモのgenreRefをcategoryRefに変更し、参照を正しく設定する
  await runBatch(store, notesCollectionQuery, exeGenreToCategoryAtNote, limit);
}

async function main() {
  console.log('start');
  await genreToCategory(db, 100);
}

main().then(() => {
  console.log('end');
});
