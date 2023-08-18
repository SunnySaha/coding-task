import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAXbhiCcirWzW4L0S7KrmcfnVKf_zpOMWc",
  authDomain: "coding-task-ec72f.firebaseapp.com",
  projectId: "coding-task-ec72f",
  storageBucket: "coding-task-ec72f.appspot.com",
  messagingSenderId: "554249646532",
  appId: "1:554249646532:web:4e18427f8bac7117d43491"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);