import { createStore } from "vuex";
import { SET_USER, LOGOUT_USER } from "./mutations";
import http from "@/http";

export const store = createStore({
    state: {
        user: {
            id: 0,
            name: "",
            email: "",
            photo_path: "",
            createdAt: "",
            token: ""
        },
    },

    mutations: {
        [SET_USER] (state, { id, name, email, photo_path, createdAt, token }) {
            state.user.id = id,
            state.user.name = name,
            state.user.email = email,
            state.user.photo_path = photo_path,
            state.user.createdAt = createdAt,
            state.user.token = token
        },

        [LOGOUT_USER] (state) {
            state.user.id = 0,
            state.user.name = "",
            state.user.email = "",
            state.user.photo_path = "",
            state.user.createdAt = "",
            state.user.token = ""
        }
    },

    actions: {
        signIn({ commit }, user) {
            return new Promise((resolve, reject) => {
                http.post("/api/user/authenticate", user)
                    .then(response => {
                        commit(SET_USER, {
                            id: response.data.id,
                            name: response.data.name,
                            email: response.data.email,
                            photo_path: response.data.photo_path,
                            createdAt: response.data.createdAt,
                            token: response.data.token
                        });

                        resolve(response)
                    })
                    .catch(error => reject(error))
            });
        }
    }
});