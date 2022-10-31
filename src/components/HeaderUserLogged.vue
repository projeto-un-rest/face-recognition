<template>
    <ul class="navbar-nav">
        <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>   

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarUserOptions" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ this.store.state.user.name }}
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarUserOptions">
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Sair</a></li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { useStore } from "vuex";
import { LOGOUT_USER } from "@/store/mutations";

export default {
    name: 'HeaderUserLogged',
    methods: {
        logout() {
            this.store.commit(LOGOUT_USER);
            this.$router.push({ name: "Login" });
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

</style>