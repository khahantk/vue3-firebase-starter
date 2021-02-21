import { createRouter, createWebHistory } from "vue-router";
import firebase from "@/helpers/firebase";
import config from "@/config";
import LayoutDefault from "@/layouts/Default";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../pages/Home"),
    meta: { layout: LayoutDefault },
  },
  {
    path: "/",
    name: "About",
    component: () => import(/* webpackChunkName: "About" */ "../pages/About"),
    meta: { layout: LayoutDefault },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../pages/NotFound"),
    meta: {
      layout: LayoutDefault,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return { x: 0, y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  const { requiresAuth = false, admin = false } = to.matched[
    to.matched.length - 1
  ].meta;
  const currentUser = await firebase.getCurrentUser();
  if (requiresAuth && !admin && !currentUser) {
    next("/login");
  } else if (requiresAuth && admin) {
    if (!currentUser) {
      next("/dashboard/login");
    } else {
      const { uid } = currentUser;
      if (uid != config.adminUID) {
        await firebase.auth().signOut();
        await firebase.auth().onAuthStateChanged(() => {
          next("/dashboard/login");
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
