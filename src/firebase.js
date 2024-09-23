import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// import {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_FIREBASE_AUTH_DOMAIN,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET_URL,
// } from '@env';

const firebaseConfig = {
  apiKey: 'AIzaSyB3YpaMtjcLBNF9V5S_T7O4ALpqxaLCOAM',
  authDomain: 'markethive-recovery.firebaseapp.com',
  projectId: 'markethive-recovery',
  storageBucket: 'markethive-recovery.appspot.com',
  messagingSenderId: '113383015154',
  appId: '1:113383015154:web:8005a74f003b5b0932066b',
  measurementId: 'G-JEZYYHVKGT',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://markethive-recovery.appspot.com');

const auth = getAuth(app);

export { auth, db, storage };
