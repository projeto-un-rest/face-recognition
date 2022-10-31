import axios from "axios"
import { store } from "@/store"

const http = axios.create({
    baseURL: process.env.VUE_APP_API
});

http.interceptors.request.use(config => {
    const token = store.state.token

    if(token) {
        config.headers.Authorization = `Bearer ${ token }`
    }
    return config

}, error => {
    return Promise.reject(error)
});

export default http