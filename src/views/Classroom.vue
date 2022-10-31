<template>
    <div class="container">
        <div class="w-75 mt-4 mx-auto">

            <div class="card shadow-sm p-4">
                <h2>{{ classroom.name }}</h2>
                <p>{{ classroom.description }}</p>
                <p>Turma criada no dia: {{ formatDate(classroom.createdAt) }}</p>
                <router-link class="btn btn-primary mt-3" v-if="classroom.id" :to="{ name: 'Attendance', params: { classroomId: classroom.id } }">
                    Iniciar Chamada
                </router-link>
            </div>

            <div class="mt-5">
                <div class="d-flex justify-content-between align-items-center">
                    <h3>Alunos</h3>
                    <router-link class="icon" :to="{ name: 'StudentsClassroom', params: { classroomid: classroom.id } }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </div>

                <hr>                

                <div class="card shadow-sm p-3 mb-3" v-for="student in classroom.students" :key="student.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>{{ student.name }}</h4>
                        <p class="mb-0">{{ student.registration }}</p>
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
                id: 0,
                name: "",
                description: "",
                createdAt: "",

                students: []
            },
        }
    },

    methods: {
        formatDate(date) {
            return date.substring(0, 10).split("-").reverse().join("/");
        }
    },

    mounted() {
        http.get(`/api/classroom/student/${ this.$route.params.classroomId }`)
            .then(response => {
                const data = response.data;

                this.classroom.id = data.id;
                this.classroom.name = data.name;
                this.classroom.description = data.description;
                this.classroom.createdAt = data.createdAt;

                this.classroom.students = data.students;
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

.icon {
    cursor: pointer;
}

.icon i {
    font-size: 20px;
}
</style>