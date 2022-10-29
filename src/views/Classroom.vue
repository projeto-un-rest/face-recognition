<template>
    <div class="container">
        <div class="w-75 mt-4 mx-auto">

            <div class="card shadow-sm p-4">
                <h2>{{ classroom.data.name }}</h2>
                <p>{{ classroom.data.description }}</p>
                <p>Código de Acesso: {{ classroom.data.code }}</p>
                <router-link class="btn btn-primary mt-3" v-if="classroom.data.code" :to="{ name: 'Attendance', params: { classroomCode: classroom.data.code } }">
                    Iniciar Chamada
                </router-link>
            </div>

            <div class="mt-5">
                <h3>Professores</h3>
                <hr>

                <div class="card shadow p-3" v-for="teacher in classroom.teachers" :key="teacher.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="card-title">{{ teacher.name }}</h4>
                        <p class="mb-0">{{ formatDate(teacher.createdAt) }}</p>
                    </div>
                </div>

                <h3>Alunos</h3>
                <hr>

                <div class="card shadow p-3" v-for="student in classroom.students" :key="student.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>{{ student.name }}</h4>
                        <p class="mb-0">{{ formatDate(student.createdAt) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/http";
import { useToast } from "vue-toastification";

export default {
    name: "Classroom",
    data() {
        return {
            classroom: {
                teachers: [],
                students: [],

                data: {
                    code: "",
                    name: "",
                    description: "",
                    createdAt: ""
                }
            },
        }
    },

    methods: {
        formatDate(date) {
            return date.substring(0, 10).split("-").reverse().join("/");
        }
    },

    mounted() {
        http.get(`/api/classroom/${ this.$route.params.code }`)
            .then(response => {
                const data = response.data;

                data.users.forEach(user => {
                    if(user.classroom_user.job_title == "PROFESSOR") {
                        this.classroom.teachers.push(user)

                    } else {
                        this.classroom.students.push(user)
                    }
                });

                this.classroom.data.code = data.code;
                this.classroom.data.name = data.name;
                this.classroom.data.description = data.description;
                this.classroom.data.createdAt = data.createdAt;

            })
            .catch(() => this.toast.error("Erro ao carregar a turma"))
    },

    setup() {
        const toast = useToast();
        return {
            toast
        }
    }
}
</script>

<style scoped>
.card h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    margin-bottom: 12px;
}

.card p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    margin-bottom: 4px;
}

.card a {
    width: 200px;
}

.container h3 {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
}

.container hr {
    color: #0B2F77;
}
</style>