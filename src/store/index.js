import { createStore, createLogger } from "vuex";
const debug = process.env.NODE_ENV !== "production";
import user from "@/store/modules/user";
export default createStore({
  modules: { user },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
