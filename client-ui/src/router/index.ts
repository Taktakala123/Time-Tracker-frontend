import { createWebHashHistory, createRouter } from "vue-router";
import Timer from "../views/Timer.vue";
import login from "../views/login.vue";
import Dashbord from "../views/Dashbord.vue";
import AppLayout from '../layout/AppLayout.vue';


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
                    component: Dashbord
                },
                {
                    path: '/timer',
                    name: 'dashboard',
                    component: Timer
                },
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: login
        }
    ]
});

export default router;

