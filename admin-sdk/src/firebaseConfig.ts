import * as admin from 'firebase-admin';
import * as serviceAccount from '../key/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
});

export const db = admin.firestore();
export const auth = admin.auth();
export { admin, serviceAccount };
