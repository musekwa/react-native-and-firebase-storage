import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDwnhI66xfZmgA2xYPbCXOL0DcwBy-deKw",
  authDomain: "media-storage-app-96e0e.firebaseapp.com",
  projectId: "media-storage-app-96e0e",
  storageBucket: "media-storage-app-96e0e.appspot.com",
  messagingSenderId: "943837581623",
  appId: "1:943837581623:web:0c3c4d9f2f7fd961ef8ab2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);