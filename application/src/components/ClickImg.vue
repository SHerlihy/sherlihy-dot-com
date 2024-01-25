<script setup lang="ts">
defineProps<{
    path: string
}>()
</script>

<template>
    <a :href='path'>
    <img :src="path"/>
    </a>
</template>
