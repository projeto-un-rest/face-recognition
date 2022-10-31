<template>
    <div class="container">

        <h2 class="container-title mt-5">Adicionar Usuários</h2>

        <div class="container-form mt-4">
            <form class="form" @submit.prevent="addUser" novalidate>
                <label for="name">Nome do Usuário</label>
                <input class="form-control" type="text" id="name" v-model="user.name">
            
                <label for="email">E-mail</label>
                <input class="form-control" type="email" id="email" v-model="user.email">

                <label for="password">Senha</label>
                <input class="form-control" type="password" id="password" v-model="user.password">
            
                <button class="btn btn-primary mt-3">Cadastrar</button>
            </form>
        </div>

        <h3 class="container-title mt-5">Lista de Usuários</h3>
        <hr>

        <div class="card shadow-sm px-4 py-3 mb-3" v-for="user in users" :key="user.id">
            <div class="d-flex justify-content-between align-items-center">

                <div>
                    <h4 class="card-title">{{ user.name }}</h4>
                    <h5 class="card-subtitle">{{ user.email }}</h5>
                </div>

                <div class="box-icon" @click="deleteUser(user.id)">
                    <i class="fa-solid fa-trash"></i>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import http from "@/http";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

export default {
    name: "AddUser",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: ""
            },

            users: []
        }
    },

    mounted() {
        this.loadUsers();
    },
    
    methods: {
        loadUsers() {
            http.get("/api/user")
                .then(response => this.users = response.data)
                .catch(() => this.toast.error("Erro ao carregar usuários"))
        },

        addUser() {
            this.v$.$validate();

            if(!this.v$.$error) {
                http.post("/api/user/register", this.user)
                    .then(() => {
                        this.toast.success("Usuário cadastrado com sucesso")
                        this.clearForm();
                        this.loadUsers();
                    })
                    .catch(() => this.toast.error("Erro ao cadastrar usuário"))
            
            } else {
                this.toast.error("Preencha todos os campos")
            }
        },

        deleteUser(id) {
            http.delete(`/api/user/${ id }`)
                .then(() => {
                    this.toast.success("Usuário excluído com sucesso");
                    this.loadUsers();
                })
                .catch(() => this.toast.error("Erro ao excluir usuário"))
        },

        clearForm() {
            this.user.name = "";
            this.user.email = "";
            this.user.password = "";
        }
    },

    validations() {
        return {
            user: {
                name: { required },
                email: { required },
                password: { required }
            }
        }
    },

    setup() {
        const toast = useToast();
        const v$ = useVuelidate();

        return {
            toast,
            v$
        }
    }
}
</script>

<style scoped>
.container-title {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 28px;
}

.container-form input {
    width: 400px;
}

h4 {
    font-weight: 500;
}

h5 {
    font-weight: 400;
}

.box-icon {
    cursor: pointer;
}

.box-icon i {
    font-size: 20px;
    color: red;
}
</style>