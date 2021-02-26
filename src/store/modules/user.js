import Cookies from "js-cookie";
import firebase from "@/helpers/firebase";
const COOKIE_KEY = "__session";
// initial state
const state = {
  loggedIn: false,
  data: {},
};

// getters
const getters = {
  user: (state) => state.user,
  data: (state) => state.user.data,
};

// actions
const actions = {
  async login({ commit }, authForm) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(
          `${authForm.username}`,
          `${authForm.password}`
        );
      commit("SET_LOGGED_IN", true);
      let options = {};
      Cookies.set(COOKIE_KEY, "", options);
    } catch (error) {
      console.log("Create account error");
      throw error;
    }
  },
  async signup({ commit }, authForm) {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          `${authForm.username}`,
          `${authForm.password}`
        );
      if (authForm.name) {
        await res.user.updateProfile({ displayName: authForm.name });
      }
      commit("SET_LOGGED_IN", true);
      let options = {};
      Cookies.set(COOKIE_KEY, "", options);
    } catch (error) {
      console.log("Create account error");
      throw error;
    }
  },
  fetchUser({ commit }, user) {
    if (user && user.uid) {
      commit("SET_LOGGED_IN", true);
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email,
      });
    } else {
      commit("SET_LOGGED_IN", false);
      commit("SET_USER", {});
    }
  },
  async logout({ commit }) {
    try {
      await firebase.auth().signOut();
      commit("SET_LOGGED_IN", null);
      commit("SET_USER", {});
      let options = {};
      Cookies.remove(COOKIE_KEY, options);
    } catch (error) {
      console.log(error);
    }
  },
};

// mutations
const mutations = {
  SET_LOGGED_IN: (state, value) => {
    state.loggedIn = value;
  },
  SET_USER: (state, data) => {
    state.data = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
