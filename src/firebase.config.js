import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'process.env.REACT_APP_REAL_ESTATE_GEOCODE_API_KEY',
  authDomain: 'real-estate-app-4d00a.firebaseapp.com',
  projectId: 'real-estate-app-4d00a',
  storageBucket: 'real-estate-app-4d00a.appspot.com',
  messagingSenderId: '569586698232',
  appId: 'process.env.REACT_APP_REAL_ESTATE_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
