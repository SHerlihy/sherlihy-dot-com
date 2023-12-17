<script setup lang="ts">

defineProps<{ heading: string}>()

</script>

<template>
        <div>
        <h2>
                {{heading}}
        </h2>
        <article>
            <slot></slot>
        </article>
        </div>
</template>

<style scoped>
h2 {
    padding-bottom: 1rem;
}
</style>
