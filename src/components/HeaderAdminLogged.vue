<template>
    <ul class="navbar-nav">
        <li class="nav-item"><router-link class="nav-link" to="/">Usuários</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/">Estudantes</router-link></li>
        <li class="nav-item"><a class="nav-link" href="#" @click.prevent="logout">Sair</a></li>
    </ul>
</template>

<script>
import { useStore } from "vuex";
import { LOGOUT_ADMIN } from "@/store/mutations";

export default {
    name: "HeaderAdminLogged",
    methods: {
        logout() {
            this.store.commit(LOGOUT_ADMIN);
            this.$router.push({ path: "/admin" });
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