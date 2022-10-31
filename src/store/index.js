import { createStore } from "vuex";
import { SET_USER, SET_ADMIN, LOGOUT_USER, LOGOUT_ADMIN } from "./mutations";
import VuexPersistence from "vuex-persist";
import http from "@/http";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export const store = createStore({
    state: {
        user: {
            id: 0,
            name: "",
            email: "",
            createdAt: ""
        },

        admin: {
            id: 0,
            name: "",
            username: "",
            createdAt: ""
        },

        token: ""
    },

    mutations: {
        [SET_USER] (state, { id, name, email, createdAt, token }) {
            state.user.id = id,
            state.user.name = name,
            state.user.email = email,
            state.user.createdAt = createdAt,
            state.token = token
        },

        [SET_ADMIN] (state, { id, name, username, createdAt, token }) {
            state.admin.id = id,
            state.admin.name = name,
            state.admin.username = username,
            state.admin.createdAt = createdAt,
            state.token = token
        },

        [LOGOUT_USER] (state) {
            state.user.id = 0,
            state.user.name = "",
            state.user.email = "",
            state.user.createdAt = "",
            state.token = ""
        },

        [LOGOUT_ADMIN] (state) {
            state.admin.id = 0,
            state.admin.name = "",
            state.admin.username = "",
            state.admin.createdAt = "",
            state.token = ""
        }
    },

    actions: {
        userSignIn({ commit }, user) {
            return new Promise((resolve, reject) => {
                http.post("/api/user/authenticate", user)
                    .then(response => {
                        () => commit(LOGOUT_ADMIN)

                        commit(SET_USER, {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            createdAt: response.data.createdAt,
                            token: response.data.token
                        });

                        resolve(response)
                    })
                    .catch(error => reject(error))
            });
        },

        adminSignIn({ commit }, admin) {
            return new Promise((resolve, reject) => {
                () => commit(LOGOUT_USER)

                http.post("/api/admin/authenticate", admin)
                    .then(response => {
                        commit(SET_ADMIN, {
                            id: response.data.id,
                            name: response.data.name,
                            username: response.data.username,
                            createdAt: response.data.createdAt,
                            token: response.data.token
                        });

                        resolve(response)
                    })
                    .catch(error => reject(error))
            });
        }
    },

    plugins: [vuexLocal.plugin]
});