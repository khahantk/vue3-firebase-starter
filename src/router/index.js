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
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "About" */ "../pages/About"),
    meta: { layout: LayoutDefault },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "../pages/Login"),
    meta: { layout: LayoutDefault },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import(/* webpackChunkName: "Signup" */ "../pages/Signup"),
    meta: { layout: LayoutDefault },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "Contact" */ "../pages/Contact"),
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
