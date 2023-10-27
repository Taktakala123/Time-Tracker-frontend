import { createWebHashHistory, createRouter } from "vue-router";
import Timer from "../views/Timer.vue";
import login from "../views/login.vue";
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
                    component: () => import('../views/Dashbord.vue')
                },
                {
                    path: '/timer',
                    name: 'dashboard',
                    component: Timer
                },
            ]
        },
    ]
});

export default router;

