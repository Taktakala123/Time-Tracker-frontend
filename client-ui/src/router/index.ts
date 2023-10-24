import { createWebHistory, createRouter } from "vue-router";
import Timer from "../Views/Timer.vue";
import Repports from "../Views/Repports.vue";


const routes = [
  {
    path: "/",
    name: "Timer",
    component: Timer  ,
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
