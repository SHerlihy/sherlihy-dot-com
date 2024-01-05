<script setup lang="ts">
import { nextTick, ref } from 'vue';

    let imgs: string[] = [
    "../../public/i2/color_picker.png",
    "../../public/i2/i2Web.png",
    "../../public/i2/i2WebSaveDrk.png"
    ];

    const renderComponent = ref(true);
    
    const forceRender = async () => {
      renderComponent.value = false;
      await nextTick();
      renderComponent.value = true;
    };

    function prev() {
        const swap = imgs.pop()
        imgs.unshift(swap)
        forceRender()
    }

    function next() {
        const swap = imgs.shift()
        imgs.push(swap)
        forceRender()
    }
</script>

<template>
    <div>
    <section>
            <TransitionGroup>
                <div v-if="renderComponent" v-for="img in imgs" :key="img">
                        <img :src="img" v-if="renderComponent" />
                </div>
            </TransitionGroup>
    </section>
    </div>
    <button @click="prev">Prev</button>
    <button @click="next">Next</button>
</template>

<style scoped>
div {
    width: 100%;
    display: flex;

    height: 300px;

    justify-content: center;
}

section {
    display: flex;
    overflow: hidden;

    scroll-behavior: smooth;

    position:absolute;

    gap: 30px;
}
</style>
