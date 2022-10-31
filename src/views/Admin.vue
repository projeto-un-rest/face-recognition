<template>
    <div class="container">

        <div class="row">
            <div class="col-md-6">
                <img class="image-admin" src="@/assets/admin.svg" alt="Imagem Ilustrativa de Administrador">
            </div>

            <div class="col-md-6 form-column">
                <h2 class="mb-4">Olá Administrador</h2>

                <form class="form" @submit.prevent="signIn" novalidate>
                    <label for="username">Nome de Usuário</label>
                    <input class="form-control" id="username" type="text" v-model="admin.username">
                
                    <label for="password">Senha</label>
                    <input class="form-control" id="password" type="password" v-model="admin.password">
                
                    <div class="d-grid my-3">
                        <button class="btn btn-primary">Entrar</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
    name: "Register",
    data() {
        return {
            admin: {
                username: "",
                password: ""
            }
        }
    },

    methods: {
        signIn() {
            this.v$.$validate();

            if(!this.v$.$error) {
                this.store.dispatch("adminSignIn", this.admin)
                    .then(() => this.$router.push({ name: "AddStudent" }))
                    .catch(() => this.toast.error("Usuário ou senha inválidos"))
            }
        }
    },

    validations() {
        return {
            admin: {
                username: { required },
                password: { required }
            }
        }
    },

    setup() {
        const v$ = useValidate();
        const store = useStore();
        const toast = useToast();

        return {
            v$,
            store,
            toast
        }
    }
}
</script>

<style scoped>
.row {
    align-items: center;
}

.image-admin {
    height: 450px;
}

.form-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form {
    width: 50%;
}

.form button {
    background-color: #0B2F77;
    color: white;
    height: 35px;
    border: none;
    border-radius: 5px;
}

@media (max-width: 920px) {
    .image-admin {
        display: none;
    }

    .form-column {
        height: 100%;
        justify-content: center;
    }
}
</style>