<template>
    <div class="modal" :class="{ 'active': showModal }">
        <slot></slot>
    </div>

    <div class="backdrop"></div>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        showModal: {
            type: Boolean,
            required: true
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