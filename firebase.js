import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLI6cUCOsqiM9KrKMedb0bv0qBxS4o2xI",
  authDomain: "todo-management-dd54b.firebaseapp.com",
  projectId: "todo-management-dd54b",
  storageBucket: "todo-management-dd54b.appspot.com",
  messagingSenderId: "132644361790",
  appId: "1:132644361790:web:1ce082786c1cdc6f1ee36f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const saveData = (params) =>
  addDoc(collection(db, "configs"), { ...params });

export const onGetDatas = (callback) =>
  onSnapshot(collection(db, "configs"), callback);

export const deleteData = (id) => deleteDoc(doc(db, "configs", id));

export const updateData = (id, newFields) =>
  updateDoc(doc(db, "configs", id), newFields);
