<script setup lang="ts">
defineProps<{ mongo?: boolean}>()
</script>

<template>
    <section :class="mongo && 'sml_rev'">
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
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sml_rev {
        flex-flow: column-reverse;
    }
}

</style>
