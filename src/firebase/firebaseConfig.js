import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
export const db = getFirestore();

// init firebase auth
export const auth = getAuth();

// 구글 사용
export const provider = new GoogleAuthProvider();
// 구글 팝업 default
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
