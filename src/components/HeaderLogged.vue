<template>
    <ul class="navbar-nav">
        <li class="nav-item me-3"><router-link class="nav-link" to="/">Home</router-link></li>   

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarUserOptions" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="navbar-user-photo" :src="userPhoto" alt="Foto de Perfil">
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarUserOptions">
                <li><router-link class="dropdown-item" to="/registration">Cadastro</router-link></li>
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Sair</a></li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { useStore } from "vuex";
import { LOGOUT_USER } from "@/store/mutations";

export default {
    name: 'HeaderLogged',
    computed: {
        userPhoto() {
            return process.env.VUE_APP_API + this.user.photo_path
        }
    },

    props: {
        user: {
            type: Object,
            required: false
        }
    },

    methods: {
        logout() {
            this.store.commit(LOGOUT_USER);
            this.$router.push({ path: "/login" });
        }
    },

    setup() {
        const store = useStore();
        return {
            store
        }
    }
}
</script>

<style scoped>
.navbar-user-photo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
</style>