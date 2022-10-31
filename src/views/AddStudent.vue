<template>
    <div class="container">

        <h2 class="container-title mt-5">Adicionar Estudante</h2>

        <div class="container-form mt-4">
            <form class="form" @submit.prevent="addStudent" novalidate>
                <label for="name">Nome do Aluno</label>
                <input class="form-control" type="text" id="name" v-model="student.name">
            
                <label for="registration">Matrícula do Aluno</label>
                <input class="form-control" type="text" id="registration" v-model="student.registration">
            
                <button class="btn btn-primary mt-3">Cadastrar</button>
            </form>
        </div>

        <h3 class="container-title mt-5">Lista de Estudantes</h3>
        <hr>

        <div class="card shadow-sm p-3 mb-3" v-for="student in students" :key="student.id">
            <div class="d-flex justify-content-between align-items-center">

                <div>
                    <h4 class="card-title">{{ student.name }}</h4>
                    <p class="card-subtitle">{{ student.registration }}</p>
                </div>

                <div class="box-icon" @click="deleteStudent(student.id)">
                    <i class="fa-solid fa-trash"></i>
                </div>

            </div>
        </div>
        
    </div>
</template>

<script>
import http from "@/http";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators"
import { useToast } from "vue-toastification";

export default {
    name: "AddStudent",
    data() {
        return {
            student: {
                name: "",
                registration: ""
            },

            students: []
        }
    },

    mounted() {
        this.loadStudents();
    },

    methods: {
        loadStudents() {
            http.get("/api/student")
                .then(response => this.students = response.data)
                .catch(() => this.toast.error("Erro ao carregar estudantes"))
        },

        addStudent() {
            this.v$.$validate();

            if(!this.v$.$error) {
                http.post("/api/student", this.student)
                    .then(() => {
                        this.toast.success("Estudante cadastrado com sucesso");
                        this.clearForm();
                        this.loadStudents();
                    })
                    .catch(() => this.toast.error("Erro ao cadastrar estudante"))

            } else {
                this.toast.error("Preencha todos os campos")
            }
        },

        deleteStudent(id) {
            http.delete(`/api/student/${ id }`)
                .then(() => {
                    this.toast.success("Estudante excluído com sucesso");
                    this.loadStudents();
                })
                .catch(() => this.toast.error("Erro ao excluir estudante"))
        },

        clearForm() {
            this.student.name = "";
            this.student.registration = "";
        },
    },

    validations() {
        return {
            student: {
                name: { required },
                registration: { required }
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