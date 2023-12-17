<script setup lang="ts">

defineProps<{ heading: string, content: string[]}>()

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
    
    margin: 3vw;
}
</style>
