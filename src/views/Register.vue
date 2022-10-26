<template>
    <div class="container">

        <div class="row">
            <div class="col-md-6">
                <img class="image-register" src="@/assets/register.svg" alt="Imagem Ilustrativa de Cadastro">
            </div>

            <div class="col-md-6 form-column">
                <h2 class="mb-4">Cadastre-se</h2>

                <form class="form" novalidate>
                    <label for="name">Primeiro Nome</label>
                    <input class="form-control" id="name" type="text">
                
                    <label for="email">E-mail</label>
                    <input class="form-control" id="email" type="email">
                
                    <label for="password">Senha</label>
                    <input class="form-control" id="password" type="password">
                
                    <div class="d-grid my-3">
                        <button @click.prevent="openModal" class="button-dialog">Tirar foto</button>
                    </div>
                </form>
            </div>
        </div>

        <Dialog :showModal="showModal">
            <div class="d-flex justify-content-between p-4">
                <h3 class="popup-title">Cadastrar uma foto de perfil</h3>
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
import Dialog from "@/components/Dialog.vue";
import http from "@/http";

export default {
    name: "Register",
    components: {
        Dialog
    },
    data() {
        return {
            showModal: false,
            photoAlreadyTaken: false
        }
    },

    methods: {
        openModal() {
            this.showModal = true;

            navigator.mediaDevices.getUserMedia({video: true})
                .then(mediaStream => {
                    const video = this.$refs.video;
                    video.srcObject = mediaStream;
                    video.play();
                })
                .catch(() => {
                    console.log("Erro ao acessar a câmera")
                })
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
            const canvas = this.$refs.canvas;

            canvas.toBlob(function(blob) {

                const formData = new FormData();
                formData.append("photo", blob, "photo.jpg");

                http.put(`/api/user/photo/1`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

            }, "image/jpeg");
        },

        clearCanvas() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d")

            context.clearRect(0, 0, canvas.width, canvas.height);
            this.photoAlreadyTaken = false;
        }
    }
}
</script>

<style scoped>
.row {
    height: 80vh;
    align-items: center;
}

.image-register {
    height: 450px;
}

.form-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form {
    width: 50%;
}

.button-dialog {
    height: 35px;
    border-radius: 5px;
}

.button-dialog::after {
    content: ">";
    margin-left: 10px;
}

.form button {
    background-color: #0B2F77;
    color: white;
    border: none;
}

.popup-title {
    font-family: "Teko", sans-serif;
    font-size: 32px;
    color: white;
}

.box-icon {
    cursor: pointer;
}

.box-icon i {
    font-size: 24px;
    color: white;
}

.video, .canvas  {
    width: 90%;
}

.btn-photo {
    background-color: #ce5117;
    color: white;
    margin-top: 16px;
    transition: .2s ease-in-out;
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

@media (max-width: 920px) {
    .image-register {
        display: none;
    }

    .form-column {
        height: 100%;
        justify-content: center;
    }
}
</style>