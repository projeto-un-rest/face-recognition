<template>
    <div class="container">

        <div class="d-flex justify-content-between align-items-center mt-4">
            <h2>Lista de Turmas</h2>
            <router-link class="icon" :to="{ name: 'AddClassroom' }">
                <i class="fa-solid fa-plus"></i>
            </router-link>
        </div>

        <hr>

        <div class="row">
            <div class="card-group col-12">
                <div class="card m-2" v-for="classroom in classrooms" :key="classroom.id">
                    <div class="card-body">

                        <h3 class="card-title">{{ classroom.name }}</h3>
                        <p class="card-text">{{ classroom.description }}</p>

                        <router-link class="btn btn-primary" :to="{ name: 'Classroom', params: { classroomId: classroom.id } }">Mais Detalhes</router-link>

                    </div>
                </div>
            </div>
        </div>

        <div class="box-message mt-4" v-if="listIsEmpty">
            <p>Você ainda não criou nenhuma turma</p>
        </div>

    </div>
</template>

<script>
import http from "@/http";
import { useStore } from "vuex";
import { useToast } from 'vue-toastification';

export default {
    name: "Home",
    data() {
        return {
            classrooms: []
        }
    },
    computed: {
        listIsEmpty() {
            return this.classrooms.length == 0
        }
    },

    mounted() {
        http.get(`/api/user/classroom/${ this.store.state.user.id }`)
            .then(response => this.classrooms = response.data.classrooms)
            .catch(() => this.toast.error("Erro ao carregar as turmas"))
    },

    setup() {
        const store = useStore();
        const toast = useToast();

        return {
            store,
            toast
        }
    }
}
</script>

<style scoped>
.row {
    margin-top: 24px;
}

.icon {
    cursor: pointer;
}

.icon i {
    font-size: 24px;
}

.row .card-group > .card {
    width: 32%;
    border: 1px solid rgba(0, 0, 0, 0.175);
    border-radius: 8px;
}

.row .card-group > .card:nth-child(2n) {
    margin: 0px 2%;
}

.box-message {
    background-color: #D8CFCD;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
}

.box-message p {
    margin-bottom: 0;
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
}

@media (max-width: 940px) {
    .row .card-group {
        justify-content: center;
    }

    .row .card-group > .card, .row .card-group > .card:nth-child(2n) {
        width: auto;
        margin: 8px;
    }
}
</style>