<template>
    <div class="container">
        <div class="w-75 mt-4 mx-auto">

            <div class="card shadow p-3" v-for="attendance in attendances" :key="attendance.id" :class="{ 'is-next': attendance.isNext }">
                <div class="d-flex justify-content-between align-items-center p-2">
                    <h4>{{ attendance.name }}</h4>

                    <div class="box-icon" @click="openModal">
                        <i class="fa-solid fa-camera"></i>
                    </div>
                </div>
            </div>

        </div>

        <Dialog title="Validar Usuário" :showModal="showModal" @whenCloseModal="closeModal">
            <div class="d-flex justify-content-center">
                <video class="video" ref="video"></video>
                <canvas class="canvas position-absolute" ref="canvas"></canvas>
            </div>

            <div class="d-flex justify-content-center mb-4">
                <div v-if="photoAlreadyTaken">
                    <button @click="sendForm" class="btn btn-photo">Verificar Usuário</button>
                    <button @click="clearCanvas" class="btn btn-other-photo">Tirar outra foto</button>
                </div>

                <button v-else @click="takePhoto" class="btn btn-photo">Tirar foto</button>
            </div>
        </Dialog>
    </div>
</template>

<script>
import http from "@/http";
import Dialog from "@/components/Dialog.vue";
import { Attendance } from "@/model/Attendance";
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';

export default {
    name: "Attendance",
    components: {
        Dialog
    },
    data() {
        return {
            showModal: false,
            photoAlreadyTaken: false,

            attendances: []
        }
    },

    mounted() {
        http.get(`/api/classroom/${ this.$route.params.classroomCode }`)
            .then(response => {

                response.data.users.forEach(user => {

                    if(user.classroom_user.job_title == "ALUNO") {
                        const attendance = new Attendance(user);
                        this.attendances.push(attendance);
                    }
                });

                this.attendances[0].isNext = true;
            })
            .catch(() => this.toast.error("Erro ao iniciar chamada"))
    },

    methods: {
        openModal() {
            navigator.mediaDevices.getUserMedia({ video: true })
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

        sendForm() {
            try {
                const canvas = this.$refs.canvas;

                canvas.toBlob(async (blob) => {

                    const formData = new FormData();
                    formData.append("photo", blob, "photo.jpg");

                    const response = await http.put(`/api/user/authenticate/face/${ this.store.state.user.id }`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    console.log(response.data);

                }, "image/jpeg");

            } catch { this.toast.error("Ocorreu um erro, tente novamente mais tarde") }
        },

        clearCanvas() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d")

            context.clearRect(0, 0, canvas.width, canvas.height);
            this.photoAlreadyTaken = false;
        }
    },

    setup() {
        const toast = useToast();
        const store = useStore();

        return {
            toast,
            store
        }
    }
}
</script>

<style scoped>
.is-next {
    background-color: #DFFFE2;
}

.video, .canvas  {
    width: 90%;
}

.btn-photo:hover {
    background-color: #c04308;
    color: white;
}

.btn-other-photo {
    background-color: grey;
    color: white;
    margin: 16px 0px 0px 16px;
}

.btn-other-photo:hover {
    background-color: grey;
    color: white;
}
</style>