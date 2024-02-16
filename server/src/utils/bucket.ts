import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.BUCKET_API_KEY,
  authDomain: process.env.BUCKET_AUTH_DOMAIN,
  projectId: process.env.BUCKET_PROJECT_ID,
  storageBucket: process.env.BUCKET_STORAGE,
  messagingSenderId: process.env.BUCKET_MSG_SENDER_ID,
  appId: process.env.BUCKET_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const bucket = getStorage(app);
