import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOaYfGPRZUKjFFmT_xn5WftvCJ1YTwWyw",
  authDomain: "horizonui-authentication.firebaseapp.com",
  projectId: "horizonui-authentication",
  storageBucket: "horizonui-authentication.appspot.com",
  messagingSenderId: "138974705333",
  appId: "1:138974705333:web:494d9e7107d734bfe5b0fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);