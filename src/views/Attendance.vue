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

        <Dialog :showModal="showModal">
            <div class="d-flex justify-content-between p-4">
                <h3 class="popup-title">Validar Aluno</h3>
                <div class="box-icon" @click="closeModal">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <video class="video" ref="video"></video>
                <canvas class="canvas position-absolute" ref="canvas"></canvas>
            </div>

            <div class="d-flex justify-content-center mb-4">
                <div v-if="photoAlreadyTaken">
                    <button @click="sendForm" class="btn btn-photo">Se cadastrar</button>
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
                    const video = this.$refs.canvas;
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

        clearCanvas() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d")

            context.clearRect(0, 0, canvas.width, canvas.height);
            this.photoAlreadyTaken = false;
        }
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
.box-icon {
    cursor: pointer;
}

.box-icon i {
    font-size: 20px;
}

.is-next {
    background-color: #DFFFE2;
}
</style>