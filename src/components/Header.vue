<template>
    <header>
        <nav class="navbar navbar-background navbar-dark navbar-expand-xl">

            <div class="container">
                <a href="#" class="navbar-brand">
                    <h1>
                        <img class="header-logo" src="@/assets/logo.png" alt="Logo da Uninorte">
                    </h1>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Abrir Menu">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="navbarContent" v-if="isLogged">
                    <HeaderAdminLogged v-if="isAdmin" />
                    <HeaderUserLogged v-else :user="this.store.state.user" />
                </div>
            </div>

        </nav>
    </header>
</template>

<script>
import HeaderUserLogged from "@/components/HeaderUserLogged.vue";
import HeaderAdminLogged from "@/components/HeaderAdminLogged.vue";

import { useStore } from "vuex"

export default {
    name: 'Header',
    components: {
        HeaderUserLogged,
        HeaderAdminLogged
    },

    computed: {
        isLogged() {
            return Boolean(this.store.state.token)
        },

        isAdmin() {
            return Boolean(this.store.state.admin.id)
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
.navbar-background {
    background-color: #0B2F77;
}

h1 {
    margin: 0;
}

.header-logo {
    width: 50px;
}

.navbar-dark .navbar-nav .nav-link {
    color: white;
}
</style>