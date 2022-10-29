<template>
    <div class="container">

        <div class="row">
            <div class="col-md-6">
                <img class="image-login" src="@/assets/login.svg">
            </div>

            <div class="col-md-6 form-column">
                <h2 class="mb-4">Bem-vindo de volta</h2>

                <form class="form" @submit.prevent="signIn" novalidate>
                    <label for="email">E-mail</label>
                    <input class="form-control" id="email" type="email" v-model="user.email">

                    <label for="password">Senha</label>
                    <input class="form-control" id="password" type="password" v-model="user.password">

                    <div class="d-grid mt-3">
                        <button class="btn btn-primary">Entrar</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import { useStore } from "vuex"

export default {
    name: "Login",
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        }
    },

    methods: {
        signIn() {
            this.store.dispatch("signIn", this.user)
                .then(() => this.$router.push({ path: "/" }))
                .catch(error => console.log(error))
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
}
</script>

<style scoped>
.row {
    height: 80vh;
    align-items: center;
}

.image-login {
    height: 475px;
}

.form-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
}

.form {
    width: 50%;
}

.form button {
    background-color: #0B2F77;
    color: white;
    border: none;
}

@media (max-width: 920px) {
    .image-login {
        display: none;
    }

    .form-column {
        height: 100%;
        justify-content: center;
    }
}
</style>