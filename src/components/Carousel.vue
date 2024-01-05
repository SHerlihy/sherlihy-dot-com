<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    imgs: string[]
    imgWidth: number
}>()
const emit = defineEmits([
    'shift-left',
    'shift-right'
])

    const renderComponent = ref(true);
    const shiftLeft = ref(false);
    const shiftRight = ref(false);

const prev = async() => {
    shiftLeft.value = true

    await new Promise(resolve => setTimeout(resolve, 1000));

    emit('shift-left')

    renderComponent.value = false;
    renderComponent.value = true;
    shiftLeft.value = false
}

const next = async() => {
    shiftRight.value = true

    await new Promise(resolve => setTimeout(resolve, 1000));

    emit('shift-right')

    renderComponent.value = false;
    renderComponent.value = true;
    shiftRight.value = false
}
</script>

<template>
    <div class="space_block">
        <div 
            class="slide" 
            v-bind:id="shiftRight && 'shift_right' || shiftLeft && 'shift_left'"
        >
    <div class="rail">
        <div class="strip"> 
        <div 
            v-if="renderComponent"
            v-for="img in imgs"
            :key="img"
            
        >
            <img :src="img" v-if="renderComponent" />
</div>
    </div>
    </div>
    </div>
    </div>
    <button @click="prev">Prev</button>
    <button @click="next">Next</button>
</template>

<style scoped>
.space_block {
    position: relative;
    height: 300px;
    overflow: hidden;
}

#shift_left {
    transition: left 1s linear;
    left: 125%;
}

#shift_right {
    transition: left 1s linear;
    left: -25%;
}

.slide {
    position: absolute;
    left: 50%;
}

.rail {
    position: absolute;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
}

.strip {
    display: flex;
    gap: 30px;
}
</style>
