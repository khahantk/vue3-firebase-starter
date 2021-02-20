import dev, { firebaseConfig as devFirebaseConfig } from "./dev";
import staging, { firebaseConfig as stagingFirebaseConfig } from "./staging";
import prod, { firebaseConfig as prodFirebaseConfig } from "./prod";

const envDefaultConfig = {
  dev,
  staging,
  prod,
};
const envFirebaseConfig = {
  dev: devFirebaseConfig,
  staging: stagingFirebaseConfig,
  prod: prodFirebaseConfig,
};
const env = process.env.VUE_APP_STAGE || "dev";

const firebaseConfig = {
  ...envFirebaseConfig[env],
};
export default {
  ...envDefaultConfig[env],
};
export { firebaseConfig };
