import firebase, { db } from "@/helpers/firebase";

export default function() {
  const createAccount = async (username, password) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(`${username}`, `${password}`);
      await res.user.updateProfile({ displayName: username });
    } catch (error) {
      console.log("Create account error");
      throw error;
    }
  };
  const login = async (username, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(`${username}`, `${password}`);
    } catch (error) {
      console.log("Login error");
      throw error;
    }
  };
  const updatePassword = async (password, newPassword) => {
    try {
      const user = firebase.auth().currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );
      await user.reauthenticateWithCredential(credentials);
      await user.updatePassword(newPassword);
    } catch (error) {
      console.log("Login error");
      throw error;
    }
  };
  const saveProfile = async (userId, { firstName, lastName }) => {
    try {
      await db
        .collection("profiles")
        .doc(userId)
        .set({
          firstName,
          lastName,
        });
    } catch (error) {
      console.log("saveProfile");
      throw error;
    }
  };
  const getProfile = async (userId) => {
    try {
      const res = await db
        .collection("profiles")
        .doc(userId)
        .get();
      return res.data();
    } catch (error) {
      console.log("getProfile");
      throw error;
    }
  };
  const sendPasswordResetEmail = async (emailAddress) => {
    try {
      await firebase.auth().sendPasswordResetEmail(emailAddress);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const sendEmailVerification = async () => {};
  const getCurrentUser = async () => {
    return firebase.auth().currentUser;
  };
  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    createAccount,
    login,
    logout,
    updatePassword,
    saveProfile,
    sendPasswordResetEmail,
    sendEmailVerification,
    getCurrentUser,
    getProfile,
  };
}
