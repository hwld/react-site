import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_UR,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SEDNER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  // Emulatorsの有効化
  if (process.env.NODE_ENV !== 'production') {
    firebase
      .auth()
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      .useEmulator('http://localhost:9099/', { disableWarnings: true });

    firebase.firestore().useEmulator('localhost', 8080);
  }
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
