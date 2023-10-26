import { createWebHistory, createRouter } from "vue-router";
import Timer from "../views/Timer.vue";
import Repports from "../views/Repports.vue";
import Login from "../views/Login.vue";


const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/timer",
    name: "Timer",
    component: Timer,
  },
  {
    path: "/Repports",
    name: "Repports",
    component: Repports,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
