import { createWebHashHistory, createRouter } from "vue-router";
import Timer from "../views/Timer.vue";
import Dashbord from "../views/Dashbord.vue";
import AppLayout from '../layout/AppLayout.vue';
import { storeToRefs } from "pinia";
import { useAuth } from "../store/useAuth";





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
            path: "/auth",
            redirect: "/",
            component: () =>
                import(
                /* webpackChunkName: "auth_layout" */ "../views/Auth.vue"
                ),
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
    const store = useAuth();

    const { currentUser, isLoggedIn } = storeToRefs(useAuth());
    currentUser.value ? undefined : await store.getCurrent();

    if (isLoggedIn.value && authRoute && !to.fullPath.includes("type=recovery")) {
        next({ name: "dashboard" });
        return;
    }
    
    if (requiresAuth && !isLoggedIn.value) {

        next({ name: "sign-up" });
        return;
    }
    
    next();

    return;
});

export default router;

