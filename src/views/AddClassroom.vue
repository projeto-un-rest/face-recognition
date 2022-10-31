<template>
    <div class="container d-flex justify-content-center">
        <div class="content">

            <h2>Criar uma nova turma</h2>

            <form class="mt-4" @submit.prevent="registerClassroom">
                <label for="name">Nome da Turma</label>
                <input class="form-control mb-4" type="text" id="name" v-model="classroom.name">

                <label for="description">Descrição</label>
                <textarea class="form-control mb-2" type="text" name="description" v-model="classroom.description"></textarea>

                <button class="btn btn-primary">Cadastrar</button>
            </form>

        </div>
    </div>
</template>

<script>
import http from "@/http";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
    name: "AddClassroom",
    data() {
        return {
            classroom: {
                name: "",
                description: "",
                idUser: 0
            }
        }
    },

    mounted() {
        this.classroom.idUser = this.store.state.user.id;
    },

    methods: {
        registerClassroom() {
            this.v$.$validate();

            if(!this.v$.$error) {
                http.post("/api/classroom", this.classroom)
                    .then(() => {
                        this.toast.success("Turma criada com sucesos");
                        this.clearForm();
                    })
                    .catch(() => this.toast.error("Erro ao criar turma"))

            } else {
                this.toast.error("Preencha todos os campos");
            }
        },

        clearForm() {
            this.classroom.name = "";
            this.classroom.description = "";
        },
    },

    validations() {
        return {
            classroom: {
                name: { required },
                description: { required }
            }
        }
    },

    setup() {
        const toast = useToast();
        const store = useStore();
        const v$ = useVuelidate();

        return {
            toast,
            store,
            v$
        }
    }
}
</script>

<style scoped>
.content {
    width: 50%;
    margin-top: 40px;
}

@media (max-width: 940px) {
    .content {
        width: 100%;
    }
}
</style>