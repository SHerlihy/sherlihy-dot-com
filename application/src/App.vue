<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

import useUrlHash from './routes/useUrlHash.ts'
import useQueryParam from './queryState/useQueryParam.ts';

import Header from './components/Header.vue'

// Start: Routing

const currentView = useUrlHash()

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
