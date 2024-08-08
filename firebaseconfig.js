// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNe-2bjODUuBu7PdcWbKJT6WFHW8HYD5Y',
  authDomain: 'markethive-258a5.firebaseapp.com',
  projectId: 'markethive-258a5',
  storageBucket: 'markethive-258a5.appspot.com',
  messagingSenderId: '363669259057',
  appId: '1:363669259057:web:90472dc96bb7e191022610',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
