import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCNe-2bjODUuBu7PdcWbKJT6WFHW8HYD5Y',
  authDomain: 'markethive-258a5.firebaseapp.com',
  projectId: 'markethive-258a5',
  storageBucket: 'markethive-258a5.appspot.com',
  messagingSenderId: '363669259057',
  appId: '1:363669259057:web:90472dc96bb7e191022610',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://markethive-258a5.appspot.com');

export { auth, db, storage };
