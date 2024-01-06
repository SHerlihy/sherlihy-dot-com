<script setup lang="ts">
</script>

<template>
    <section>
        <slot name="left"></slot>
        <slot name="right"></slot>
    </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3vw;
}

@media screen and (max-width: 1200px) {
    section {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        column-gap: 3vw;

        padding: 1rem;
    }
}

</style>
