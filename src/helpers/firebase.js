import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/firestore";
import "firebase/storage";

import { firebaseConfig } from "@/config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    }, reject);
  });
};
export default firebase;
export const db = firebaseApp.firestore();
