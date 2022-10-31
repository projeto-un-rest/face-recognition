<template>
    <footer class="footer">
        <p>Desenvolvido pelos alunos da Uninorte</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0B2F77;
    width: 100%;
    margin-top: 20px;
    padding: 1em;
    position: absolute;
    bottom: 0;
}

.footer p {
    color: white;
    margin-bottom: 0;
}
</style>