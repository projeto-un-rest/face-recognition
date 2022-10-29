<template>
    <div class="container">

        

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

</style>