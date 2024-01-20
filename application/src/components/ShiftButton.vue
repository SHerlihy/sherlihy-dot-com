<script setup lang="ts">

interface Props {
    sizePx?: number
}

const props = withDefaults(defineProps<Props>(), {
    sizePx: 50
})

const sizeCSS = `${props.sizePx}px`

const emit = defineEmits([
    'shift'
])

const shift = async() => {
    emit('shift')
}

</script>

<template>
    <button @click="shift">
        <slot/>
    </button>
</template>

<style scoped>
button {
    height: v-bind("sizeCSS");
    width: v-bind("sizeCSS");
    border-radius: 50%;
    
    font-weight: bolder;
}
</style>

