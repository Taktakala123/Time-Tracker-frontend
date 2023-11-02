import { createWebHashHistory, createRouter } from "vue-router";
import Timer from "../views/Timer.vue";
import Dashboard from "../views/Dashbord.vue";
import AppLayout from '../layout/AppLayout.vue';
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/useAuth";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/auth',
      redirect: "/",
      meta: {
        auth: true,
      },
      name: "auth",
      component: () =>import('../views/Auth.vue'),
      children:[
        {
          path: "signin",
          name: "signin",
          meta: {
            auth: true,
          },
          component: () =>
            import(/* webpackChunkName: "sign_in" */ "../components/auth/signIn.vue"),
        },
        {
          path: "signup",
          name: "signup",
          meta: {
            auth: true,
          },
          component: () =>
            import(  /* webpackChunkName: "sign_up" */ "../components/auth/signUp.vue"),
        },
      ]
    },
    {
      path: '/',
      meta: {
        requiresAuth: true,
      },
      component: AppLayout,
      children: [
        {
          path: '/',
          meta: { requiresAuth: true },
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/timer',
          meta: { requiresAuth: true },
          name: 'timer',
          component: Timer
        },
      ]
    },
    
  ]
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authRoute = to.matched.some((record) => record.meta.auth);
  const store = useAuthStore();

  const { currentUser, isLoggedIn } = storeToRefs(useAuthStore());
  currentUser.value ? null : await store.getCurrent();

  if (isLoggedIn.value && authRoute && !to.fullPath.includes("type=recovery")) {
    next({ name: "dashboard" });
    return;
  }

  if (requiresAuth && !isLoggedIn.value) {
    next({ name: "signin" });
    return;
  }
  next();
  return;
});

export default router;
