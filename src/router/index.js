import { createRouter, createWebHashHistory } from "vue-router";
import { store } from "@/store";

import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import Admin from "@/views/Admin.vue"
import Classroom from "@/views/Classroom.vue"
import Attendance from "@/views/Attendance.vue"

import AddClassroom from "@/views/AddClassroom.vue"
import StudentsClassroom from "@/views/StudentsClassroom.vue"

import AddStudent from "@/views/AddStudent.vue"

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
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            public: true
        }
    },

    {
        path: "/classroom/:classroomId",
        name: "Classroom",
        component: Classroom
    },

    {
        path: "/add/classroom",
        name: "AddClassroom",
        component: AddClassroom
    },

    {
        path: "/attendance/:classroomId",
        name: "Attendance",
        component: Attendance
    },

    {
        path: "/students/classroom/:classroomId",
        name: "StudentsClassroom",
        component: StudentsClassroom
    },

    {
        path: "/admin/add/student",
        name: "AddStudent",
        component: AddStudent,
        meta: {
            admin: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach((routerTo, routerFrom, next) => {

    if(!routerTo.meta.public && !store.state.token) {
        return next({ path: "/login" })
    }

    if(routerTo.path == "/login" && store.state.token) {
        return next({ name: "Home" })
    }

    if(routerTo.path == "/admin" && store.state.token) {
        return next({ name: "AddStudent" })
    }

    if(routerTo.meta.admin && !store.state.admin.id) {
        return next({ name: "Home" });
    }

    if(!routerTo.meta.admin && store.state.admin.id) {
        return next({ name: "AddStudent" })
    }

    next()
});

export default router;