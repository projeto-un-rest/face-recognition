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
                
                    <button @click.prevent="openModal" class="my-4 button-dialog">Selecionar foto</button>
                
                    <div class="d-grid">
                        <button class="btn btn-primary">Registrar</button>
                    </div>
                </form>
            </div>
        </div>

        <Dialog :showModal="showModal">
            <h3 class="text-center">Cadastrar uma foto de perfil</h3>
            <video ref="video"></video>
            <canvas id="canvas"></canvas>
            <button id="capture">Tirar foto</button>
        </Dialog>
        
    </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue"

export default {
    name: "Register",
    components: {
        Dialog
    },
    data() {
        return {
            showModal: false
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
                    console.log('Não há permissões para acessar a webcam')
                })
        },

        closeModal() {
            this.showModal = false;
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
    height: 550px;
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
    width: 50%;
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
</style>