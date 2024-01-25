<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import Home from './Home.vue'
import Infrastructure from './Infrastructure.vue'

const routes = {
  '/': Home,
  '/infrastructure': Infrastructure
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
    <Header />
  <component :is="currentView" />
</template>
