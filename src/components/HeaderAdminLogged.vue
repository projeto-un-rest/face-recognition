<template>
    <ul class="navbar-nav">
        <li class="nav-item"><router-link class="nav-link" :to="{ name: 'AddStudent' }">Estudantes</router-link></li>
        <li class="nav-item"><router-link class="nav-link" :to="{ name: 'AddUser' }">Usuários</router-link></li>

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarAdminOptions" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ this.store.state.admin.name }}
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarAdminOptions">
                <li><a class="dropdown-item" href="#" @click.prevent="logout">Sair</a></li>
            </ul>
        </li>
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
            this.$router.push({ name: "Admin" });
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