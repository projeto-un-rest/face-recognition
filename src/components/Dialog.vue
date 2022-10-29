<template>
    <div class="modal" :class="{ 'active': showModal }">
        <div class="d-flex justify-content-between p-4">
            <h3 class="popup-title">{{ title }}</h3>
            <div class="box-icon" @click="closeModal">
                <i class="fa-sharp fa-solid fa-xmark"></i>
            </div>
        </div>

        <slot></slot>
    </div>

    <div class="backdrop"></div>
</template>

<script>
export default {
    name: "Dialog",
    emits: ["whenCloseModal"],
    props: {
        title: {
            type: String,
            required: false
        },

        showModal: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        closeModal() {
            this.$emit("whenCloseModal");
        }
    }
}
</script>

<style scoped>
.modal {
    width: 50%;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(-35deg, white, #01153d);
    border-radius: 5px;
    display: none;
}

.modal.active {
    display: block;
    animation: showModal 1s;
}

.popup-title {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
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

@keyframes showModal {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal.active + .backdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5)
}

@media (max-width: 920px) {
    .modal {
        width: 80%;
        top: 20%;
    }
}
</style>