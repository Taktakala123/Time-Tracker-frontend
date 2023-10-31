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
      path: '/',
      meta: {
        requiresAuth: true,
      },
      component: AppLayout,
      children: [
        {
          path: '/',  
          meta:{requiresAuth: true},
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/timer',
          meta:{requiresAuth: true},
          name: 'timer',
          component: Timer
        },
      ]
    },
    {
      path: "/auth",
      redirect: "/",
      component: () =>
        import(/* webpackChunkName: "auth_layout" */ "../views/Auth.vue"),
      children: [
        {
          path: "sign-in",
          name: "sign-in",
          meta: {
            auth: true,
          },
          component: () =>
            import(/* webpackChunkName: "sign_in" */ "../components/auth/signIn.vue"),
        },
        {
          path: "sign-up",
          name: "sign-up",
          meta: {
            auth: true,
          },
          component: () =>
            import(
              /* webpackChunkName: "sign_up" */
              "../components/auth/signUp.vue"
            ),
        },
      ]
    },
  ]
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const authRoute = to.matched.some((record) => record.meta.auth);
    const store = useAuthStore();
    const {  isLoggedIn } = storeToRefs(store);

    if (requiresAuth && !isLoggedIn.value) {
      next({ name: "sign-in" });
      return;
    }
    
    next();
    return;
  });
  
export default router;
