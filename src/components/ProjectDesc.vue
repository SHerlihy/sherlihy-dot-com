<script setup lang="ts">

defineProps<{ heading: string}>()

</script>

<template>
        <div class="full_width">
        <h2>
                {{heading}}
        </h2>
        <br/>
        <article>
            <slot></slot>
        </article>
        </div>
</template>

<style scoped>
div {
    width: 100%;
}
</style>
