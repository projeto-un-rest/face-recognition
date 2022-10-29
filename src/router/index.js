import { createRouter, createWebHashHistory } from "vue-router";
import { store } from "@/store"

import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue"
import Classroom from "@/views/Classroom.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            public: true
        }
    },

    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            public: true
        }
    },

    {
        path: "/classroom/:code",
        name: "Classroom",
        component: Classroom
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach((routerTo, routerFrom, next) => {

    if(!routerTo.meta.public && !store.state.user.token) {
        return next({ path: "/login" })
    }

    next()
});

export default router;