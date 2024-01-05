<script setup lang="ts">
import { ref } from 'vue';

    let imgs: string[] = [
    "../../public/i2/color_picker.png",
    "../../public/i2/i2Web.png",
    "../../public/i2/i2WebSaveDrk.png"
    ];

    const renderComponent = ref(true);
    const shiftLeft = ref(false);
    const shiftRight = ref(false);

const prev = async() => {
    shiftLeft.value = true

    await new Promise(resolve => setTimeout(resolve, 1000));

    const swap = imgs.pop()
    imgs.unshift(swap)
    renderComponent.value = false;
    renderComponent.value = true;
    shiftLeft.value = false
}

const next = async() => {
    shiftRight.value = true

    await new Promise(resolve => setTimeout(resolve, 1000));

    const swap = imgs.shift()
    imgs.push(swap)
    renderComponent.value = false;
    renderComponent.value = true;
    shiftRight.value = false
}

//const shiftSlide = computed(() => {
//    if (shiftLeft === true) {
//        return "shift_left"
//    }
//
//    if (shiftRight === true) {
//        return "shift_right"
//    }
//    return ""
//})
</script>

            <!--v-bind:id="shiftLeft?'shift_left':''">-->
            <!--v-bind:id="{shift_left: shiftLeft === true, shift_right: shiftRight === true}">-->
<template>
    <div class="space_block">
        <div 
            class="slide" 
            v-bind:id="shiftRight && 'shift_right' || shiftLeft && 'shift_left'"
        >
    <div class="rail">
        <section> 
        <div 
            class="strip"
            v-if="renderComponent"
            v-for="img in imgs"
            :key="img"
            
        >
            <img :src="img" v-if="renderComponent" />
</div>
    </section>
    </div>
    </div>
    </div>
    <button @click="prev">Prev</button>
    <button @click="next">Next</button>
</template>

<style scoped>
.space_block {
    height: 300px;
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

section {
    display: flex;
    gap: 30px;
}
</style>
