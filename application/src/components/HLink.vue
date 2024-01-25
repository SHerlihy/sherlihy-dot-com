<script setup lang="ts">
const props = defineProps<{
    linkId: string
}>()

const hId = `#${props.linkId}`
</script>

<template>
    <h2 :id='linkId'>
        <a :href='hId'>
            <slot/>
        </a>
    </h2>
</template>

<style scoped>
a {
    color: currentcolor;
}
</style>
