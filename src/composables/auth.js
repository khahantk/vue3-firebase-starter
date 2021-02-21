import firebase from "@/firebase";

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
  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createAccount,
    login,
    logout,
  };
}
