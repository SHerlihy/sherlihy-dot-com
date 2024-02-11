<script setup lang="ts">
defineProps<{ 
    mongo?: boolean
}>()
</script>

<template>
    <template v-if="mongo === true">
    <section class="sml_rev">
        <slot name="image"></slot>
        <slot name="text"></slot>
    </section>
    </template>
    <template v-else>
    <section>
        <slot name="text"></slot>
        <slot name="image"></slot>
    </section>
    </template>
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
