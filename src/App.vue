<script setup lang="ts">
import Header from './components/Header.vue'
import I2group from './sections/I2group.vue'
import DistArchi from './sections/DistArchi.vue'
import DataToDiagram from './sections/DataToDiagram.vue'
import VelmaMode from './sections/VelmaMode.vue'
import Introduction from './sections/Introduction.vue'
import SHerlihyDotCom from './sections/SHerlihyDotCom.vue'
</script>


<template>
    <Header />
    <main>
        <Introduction/>
        <br/>
        <SHerlihyDotCom/>
        <br/>
        <I2group/>
        <br />
        <br />
        <div class="light_bg">
            <br/>
                <DistArchi/>
            <br/>
        </div>
        <br />
        <DataToDiagram/>
        <br/>

        <div class="light_bg">
            <br/>
            <VelmaMode/>
            <br/>
        </div>

    </main>
</template>

<style scoped>
.light_bg {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;

    font: inherit;
}

html {
    color-scheme: dark light;
}

body {
    min-height: 100svh;
}

img,
picture,
svg,
video {
    display: block;
    max-width: 100%;
}

h1, h2, h3, h4, h5, h6 {
    hanging-punctuation: first;
    text-wrap: pretty;
}

h2 {
    font-size: 1.5rem;
}

p {
    text-wrap: pretty;
}

@media (prefers-reduced-motion: no-preference) {
    :has(:target) {
        scroll-behavior: smooth;
        scroll-padding-top: 1rem;
    }
}
:root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
}

section {
    padding: 1rem;
}

a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
}

a:hover {
    color: #535bf2;
}

li {
    list-style-position: inside;
}
</style>
