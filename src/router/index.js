import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Discovery from "@/views/Discovery.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresLogin: true,
        }
    },
    {
        path: "/discovery/:gateway_id",
        name: "Discovery",
        component: Discovery,
        meta : {
            requiresLogin: true,
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
        meta: {
            requiresLogin: true,
        }
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (sessionStorage.getItem("token") === null) {
            next({ name: "Login" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
