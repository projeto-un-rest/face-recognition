<template>
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

            <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
                <HeaderLogged v-if="userIsLogged" :user="this.store.state.user" />
                <HeaderNotLogged v-else />
            </div>
        </div>

    </nav>
</template>

<script>
import HeaderLogged from "@/components/HeaderLogged.vue"
import HeaderNotLogged from "@/components/HeaderNotLogged.vue"

import { useStore } from "vuex"

export default {
    name: 'Header',
    components: {
        HeaderLogged,
        HeaderNotLogged
    },

    computed: {
        userIsLogged() {
            return Boolean(this.store.state.user.token)
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