import { createWebHashHistory, createRouter } from "vue-router";
import Timer from "../views/Timer.vue";
import login from "../views/login.vue";
import AppLayout from '../layout/AppLayout.vue';

// const routes = [
//   {
//     path: "/",
//     name: "login",
//     component: login,
//   },
//   {
//     path: "/timer",
//     name: "Timer",
//     component: Timer,
//   },
  
// ];
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
      {
          path: '/',
          component: AppLayout,
          children: [
              {
                  path: '/',
                  name: 'dashboard',
                  component: () => import('../views/Dashbord.vue')
              },
          ]
      },
  ]
});

export default router;

