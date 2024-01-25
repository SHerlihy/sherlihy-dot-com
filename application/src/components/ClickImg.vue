<script setup lang="ts">
const props = defineProps<{
    path: string
}>()

const imgPath = import.meta.env.VITE_IMGS_PATH === undefined ? "/public" : import.meta.env.VITE_IMGS_PATH

let servePath = props.path
const pathDirs = props.path.split("/")
let pubIdx = 0
while (pathDirs[pubIdx] !== "public" && pubIdx < pathDirs.length) {
    pubIdx++
}

const rootPath = pathDirs.slice(pubIdx+1).join("/")
servePath = `${imgPath}/${rootPath}`

</script>

<template>
    <a :href='servePath'>
    <img :src="servePath"/>
    </a>
</template>
