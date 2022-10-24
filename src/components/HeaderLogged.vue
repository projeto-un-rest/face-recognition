<template>
    <ul class="navbar-nav">
        <li class="nav-item me-3"><router-link class="nav-link" to="/">Home</router-link></li>   

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarUserOptions" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="navbar-user-photo" :src="userPhoto" alt="Foto de Perfil">
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarUserOptions">
                <li><router-link class="dropdown-item" to="/registration">Cadastro</router-link></li>
                <li><router-link class="dropdown-item" to="/update-password">Alterar senha</router-link></li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'HeaderLogged',
    computed: {
        userPhoto() {
            return process.env.VUE_APP_API + this.user.photo_path
        }
    },
    props: {
        user: {
            type: Object,
            required: false
        }
    }
}
</script>

<style scoped>
.navbar-user-photo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
</style>