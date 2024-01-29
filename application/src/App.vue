<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

import useQueryParam from './queryState/useQueryParam.ts';

import Header from './components/Header.vue'
import Home from './routes/home/Home.vue'
import Infrastructure from './routes/infrastructure/Infrastructure.vue'

// Start: Routing

const RoutePathsTuple = ['/','/infrastructure'] as const
const routes = {
    '/': Home,
    '/infrastructure': Infrastructure
} as const

const routePaths = Object.keys(routes)

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
})

const currentView = computed(() => {
    const newPath = currentPath.value.slice(1)
    const validPath = (routePaths.includes(newPath) ? newPath : '/') as typeof RoutePathsTuple[number]
    return routes[validPath]
})

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

    <!-- <div :class="{ 'requires-no-scroll': isThin && showingRouting }"> -->

    <div :class="{ 'requires-no-scroll': showingRouting && isThin }">
        <component :is="currentView" />
    </div>
</template>

<style scoped>
.requires-no-scroll {
    overflow: hidden;
}
</style>

<style>
body:has(.requires-no-scroll) {
    overflow: hidden;
}
</style>
