<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

import useQueryParam from './queryState/useQueryParam.ts';

import Header from './components/header/Header.vue'

// End: Routing

// Start: Routing open

const routingParam = useQueryParam('showRouting')
const showingRouting = computed(() => {
    if (routingParam.value !== '1') {
        return false
    }

    return true
})

// End: Routing open

// Start: Is window width thin

const isThin = ref(window.innerWidth < 600)

useEventListener(window, 'resize', () => {
    if (window.innerWidth < 600) {
        isThin.value = true
        return
    }

    isThin.value = false
})

//End: Is window width thin
</script>

<template>
    <Header />
    <div :class="{ 'requires-no-scroll': showingRouting && isThin }">
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
.requires-no-scroll {
    overflow: hidden;
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
    scroll-behavior: smooth;
    scroll-padding-top: var(--scroll-padding, 10vh);
}

body {
    min-height: 100svh;
}

body:has(.requires-no-scroll) {
    overflow: hidden;
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
    margin: 0 10vw;
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

.light_bg {
    background-color: rgba(128, 128, 128, 0.1);
}
</style>
