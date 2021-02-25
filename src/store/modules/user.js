import Cookies from "js-cookie";
const COOKIE_KEY = "__session";
// initial state
const state = {
  token: "",
  item: {},
};

// getters
const getters = {
  token: (state) => state.user.token,
  item: (state) => state.user.item,
};

// actions
const actions = {
  async login({ commit }, authForm) {
    this.$axios.setToken(false);
    const data = await this.$axios.$post("auth/login", authForm);
    const { error, message, token, user } = data;
    if (error) {
      throw new Error(message);
    }
    commit("SET_TOKEN", token);
    commit("SET_ITEM", { ...user });
    let options = {};
    Cookies.set(COOKIE_KEY, token, options);
    return data;
  },
  async signup({ commit }, authForm) {
    this.$axios.setToken(false);
    const data = await this.$axios.$post("auth/signup", authForm);
    const { error, message, token, user } = data;
    if (error) {
      throw new Error(message);
    }
    commit("SET_TOKEN", token);
    commit("SET_ITEM", { ...user });
    let options = {};

    Cookies.set(COOKIE_KEY, token, options);
    return data;
  },
  async getAuthUser({ commit, state }) {},
  logout({ commit, state, dispatch }) {
    commit("SET_TOKEN", null);
    commit("SET_AGENT_INFO", {});
    let options = {};
    Cookies.remove(COOKIE_KEY, options);
  },
};

// mutations
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ITEM: (state, item) => {
    state.item = item;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
