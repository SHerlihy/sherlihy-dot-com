<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    imgs: string[]
    imgWidthPx: number
    imgGapPx: number
}>()

const emit = defineEmits([
    'shift-left',
    'shift-right'
])

    const renderComponent = ref(true);
    const shiftLeft = ref(false);
    const shiftRight = ref(false);

const imgWidthCSS = `${props.imgWidthPx}px`

const viewWidthPx = (props.imgWidthPx * 1.5)+(2*props.imgGapPx)
const viewWidthCSS = `${viewWidthPx}px`

const totWidthPx = (props.imgWidthPx*props.imgs.length) + (props.imgGapPx*(props.imgs.length+1))

const midWidthPx = totWidthPx/4
const midWidthCSS =`${midWidthPx}px`

const slideWidthPx = props.imgWidthPx + (2*props.imgGapPx)

const leftShift = midWidthPx+slideWidthPx
const leftShiftCSS = `${leftShift}px`

const rightShift = midWidthPx-slideWidthPx
const rightShiftCSS = `${rightShift}px`

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
    <div class="rail"
            v-bind:id="shiftRight && 'shift_right' || shiftLeft && 'shift_left'"
            >
        <div 
            class="slide"
            v-if="renderComponent"
            v-for="img in imgs"
            :key="img"
            
        >
            <img :src="img" v-if="renderComponent" />
</div>
    </div>
    <button @click="prev" class="left_btn">Prev</button>
    <button @click="next" class="right_btn">Next</button>
    </div>
</template>

<style scoped>
.left_btn {
    position: absolute;
    left: 1rem;
}

.right_btn {
    position: absolute;
    right: 1rem;
}

.space_block {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    max-width: 100vw;

    width: v-bind("viewWidthCSS");
    height: v-bind("imgWidthCSS");
}

#shift_left {
    transition: left 1s linear;
    left: v-bind("leftShiftCSS");
}

#shift_right {
    transition: left 1s linear;
    left: v-bind("rightShiftCSS");
}

.rail {
    position: absolute;
    display: flex;
    left: v-bind("midWidthCSS");
    transform: translateX(-50%);
    gap: 30px;
}

.slide {
    display: flex;
    align-items: center;
}

</style>

Shift ids used to apply css as more specific than class
