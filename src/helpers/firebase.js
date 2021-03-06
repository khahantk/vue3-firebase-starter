import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/firestore";
import "firebase/storage";

import { firebaseConfig } from "@/config";
import store from "@/store";

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
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("user/fetchUser", user);
});
