<script setup lang="ts">

defineProps<{ heading: string}>()

</script>

<template>
        <div class="full_width">
        <h2>
                {{heading}}
        </h2>
        <article>
            <slot></slot>
        </article>
        </div>
</template>

<style scoped>
div {
    padding: 1rem;
}

h2 {
    padding-bottom: 1rem;
}

@media screen and (max-width: 1200px) {
    .full_width{
        width: 100%;
    }
}
</style>
