import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA0F207nlMxCCR8xMUz-ENYapTtrvmRvT0',
  authDomain: 'real-estate-app-4d00a.firebaseapp.com',
  projectId: 'real-estate-app-4d00a',
  storageBucket: 'real-estate-app-4d00a.appspot.com',
  messagingSenderId: '569586698232',
  appId: '1:569586698232:web:c477710372a9ffc50eb80d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
