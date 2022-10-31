<template>
    <div class="container">

        <h2 class="container-title mt-4">Adicionar aluno à turma de <span>{{ classroom.name }}</span></h2>

        <div class="container-form mt-3">
            <form class="form" @submit.prevent="findStudent" novalidate>
                <label for="registration">Mátricula do Aluno</label>
                <input class="form-control" type="text" id="registration" v-model="student.registration">

                <button class="btn btn-primary mt-3">Adicionar Aluno</button>
            </form>
        </div>

        <h3 class="container-title mt-5">Lista de Alunos</h3>
        <hr>

        <div class="card shadow-sm p-3 mb-3" v-for="student in classroom.students" :key="student.id">
            <div class="d-flex justify-content-between align-items-center">
                <h4>{{ student.name }}</h4>
                <p class="mb-0">{{ student.registration }}</p>
            </div>
        </div>

        <Dialog title="Cadastrar uma Foto" :showModal="showModal" @whenCloseModal="closeModal">
            <div class="d-flex justify-content-center">
                <video class="video" ref="video"></video>
                <canvas class="canvas position-absolute" ref="canvas"></canvas>
            </div>

            <div class="d-flex justify-content-center my-4">
                <div v-if="photoAlreadyTaken">
                    <button @click="addPhoto" class="btn btn-primary me-2">Cadastrar Foto</button>
                    <button @click="clearCanvas" class="btn btn-secondary">Tirar outra foto</button>
                </div>

                <button v-else @click="takePhoto" class="btn btn-primary">Tirar foto</button>
            </div>
        </Dialog>

    </div>
</template>

<script>
import http from "@/http";
import Dialog from "@/components/Dialog.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useToast } from 'vue-toastification';

export default {
    name: "StudentsClassroom",
    components: {
        Dialog
    },
    data() {
        return {
            showModal: false,
            photoAlreadyTaken: false,

            student: {
                id: 0,
                name: "",
                registration: "",
                photoPath: "",
                createdAt: ""
            },

            classroom: {
                id: 0,
                name: "",
                description: "",
                createdAt: "",

                students: []
            }
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

    methods: {
        findStudent() {
            http.get(`/api/student/confirm/${ this.student.registration }`)
                .then(response => {
                    const data = response.data;

                    this.student.id = data.id;
                    this.student.name = data.name;
                    this.student.registration = data.registration;
                    this.student.photoPath = data.photo_path;
                    this.student.createdAt = data.createdAt

                    if(this.student.photoPath === null) {
                        this.openModal();

                    } else {
                        this.addStudent();
                    }
                })
                .catch(() => this.toast.error("Estudante não matriculado"))
        },

        openModal() {          
            navigator.mediaDevices.getUserMedia({video: true})
                .then(mediaStream => {
                    const video = this.$refs.video;
                    video.srcObject = mediaStream;
                    video.play();

                    this.showModal = true;
                })
                .catch(() => this.toast.error("Não foi possível acessar a câmera"))
        },

        closeModal() {
            this.showModal = false;
            this.clearCanvas();
        },

        takePhoto() {
            const canvas = this.$refs.canvas;
            const video = this.$refs.video;
            const context = canvas.getContext('2d');

            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            context.drawImage(video, 0, 0)
            this.photoAlreadyTaken = true;
        },

        addPhoto() {
            this.v$.$validate();

            if(!this.v$.$error) {
                try {
                    const canvas = this.$refs.canvas;

                    canvas.toBlob(async (blob) => {

                        const formData = new FormData();
                        formData.append("photo", blob, "photo.jpg");

                        await http.put(`/api/student/photo/${ this.student.id }`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });

                        this.addStudent();

                    }, "image/jpeg");
    
                } catch { this.toast.error("Ocorreu um erro, tente novamente mais tarde") }
    
            } else {
                this.closeModal();
                this.toast.error("Ocorreu um erro, tente novamente mais tarde");
            }
        },

        addStudent() {
            http.post("/api/student/classroom", {
                idStudent: this.student.id,
                idClassroom: this.classroom.id

            }).then(() => {
                this.closeModal();
                this.$router.push({ name: 'Classroom', params: { classroomId: this.$route.params.classroomId } });
            
            }).catch(() => this.toast.error("Não foi possível adicionar o estudante"))
        },

        clearCanvas() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d")

            context.clearRect(0, 0, canvas.width, canvas.height);
            this.photoAlreadyTaken = false;
        }
    },

    validations() {
        return {
            student: { id: { required } },
            classroom: { id: { required } }
        }
    },

    setup() {
        const v$ = useVuelidate();
        const toast = useToast();

        return {
            v$,
            toast
        }
    }
}
</script>

<style scoped>
h2.container-title {
    font-family: "Roboto", sans-serif;
    font-size: 28px;
    font-weight: 400;
}

h2.container-title > span { 
    font-weight: 500;
}

h3.container-title {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
}

.container-form {
    width: 25%;
}

@media (max-width: 940px) {
    h2.container-title {
        font-size: 24px;
    }

    h3.container-title {
        font-size: 20px;
    }

    .container-form {
        width: 50%;
    }
}
</style>