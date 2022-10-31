<template>
    <div class="container">
        <div class="w-75 mt-4 mx-auto">

            <div class="d-flex justify-content-between mt-5 mb-4">
                <h2>Chamada do dia: {{ todayDate }}</h2>

                <button @click="finishAttendance" class="btn btn-primary">Encerrar Chamada</button>
            </div>

            <div class="card shadow-sm p-2 mb-2" v-for="(attendance, index) in attendances" :key="attendance.id" :class="{ 'validated': attendance.status == 'VALIDATED', 'refused': attendance.status == 'REFUSED' }">
                <div class="d-flex justify-content-between align-items-center p-2">
                    <h3 class="card-title">{{ attendance.name }}</h3>

                    <div class="box-icon" @click="openModal(attendance, index)">
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

            <div class="d-flex justify-content-center my-4">
                <div v-if="photoAlreadyTaken">
                    <button @click="verifyUser" class="btn btn-primary me-2">Verificar Usuário</button>
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

            attendances: [],
            attendanceSelected: {
                attendance: {},
                index: null
            }
        }
    },

    computed: {
        todayDate() {
            const date = new Date();
            return this.addZero(date.getDate()) + "/" + this.addZero(date.getMonth()) + "/" + date.getFullYear();
        }
    },

    mounted() {
        http.get(`/api/classroom/student/${ this.$route.params.classroomId }`)
            .then(response => {
                response.data.students.forEach(student => {
                    const attendance = new Attendance(student);
                    this.attendances.push(attendance);
                });
            })
            .catch(() => this.toast.error("Erro ao iniciar chamada"))
    },

    methods: {
        finishAttendance() {

            let alreadyFinished = true;

            this.attendances.forEach(attendance => {

                if(attendance.status === "PENDING") {
                    this.toast.warning("Conclua a chamada primeiro");
                    alreadyFinished = false;
                }
            });

            if(alreadyFinished) {
                this.$router.push({ name: "Classroom", params: { id: this.$route.params.classroomId } });
            }
        },

        openModal(attendance, index) {
            if(attendance.status == "PENDING") {

                navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    const video = this.$refs.video;
                    video.srcObject = mediaStream;
                    video.play();

                    this.attendanceSelected.attendance = attendance;
                    this.attendanceSelected.index = index;

                    this.showModal = true;
                })
                .catch(() => this.toast.error("Não foi possível acessar a câmera"))
            }
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

        verifyUser() {
            try {
                const canvas = this.$refs.canvas;

                canvas.toBlob(async (blob) => {

                    const formData = new FormData();
                    formData.append("photo", blob, "photo.jpg");

                    const response = await http.post(`/api/student/authenticate/face/${ this.attendanceSelected.attendance.id }`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    this.closeModal();

                    if(response.data.isEqual) {
                        this.toast.success("Usuário validado com sucesso");
                        this.attendanceSelected.attendance.status = "VALIDATED";

                    } else {
                        this.toast.error("Falha na autenticação do usuário");
                        this.attendanceSelected.attendance.status = "REFUSED";
                    }

                    this.attendances.splice(this.attendanceSelected.index, 1);
                    this.attendances.push(this.attendanceSelected.attendance);

                }, "image/jpeg");

            } catch { this.toast.error("Ocorreu um erro, tente novamente mais tarde") }
        },

        clearCanvas() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d")

            context.clearRect(0, 0, canvas.width, canvas.height);
            this.photoAlreadyTaken = false;
        },

        addZero(number) {

            if(number <= 9) {
                return "0" + number;
            }

            return number;
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
.card.validated {
    background-color: rgb(223, 255, 226);
}

.card.refused {
    background-color: rgba(255, 64, 64, .5);
}

.card-title {
    font-size: 24px;
}

.box-icon {
    cursor: pointer;
}

.box-icon i {
    font-size: 20px;
}

.video, .canvas  {
    width: 90%;
}

.box-buttons {
    margin-top: 16px;
}

.button-popup {
    width: 150px;
    height: 40px;
    background-color: #CE5117;
    color: white;
    border: none;
    border-radius: 5px;
}
</style>