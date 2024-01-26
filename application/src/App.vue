<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

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

const params = useUrlSearchParams('history')
const showRouting = ref(params.showRouting)

let previousUrl = '';
const observer = new MutationObserver(function() {
  if (window.location.href !== previousUrl) {
      previousUrl = window.location.href;
        const newParams = useUrlSearchParams('history')
        showRouting.value = newParams.showRouting
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config);
</script>

<template>
    <div v-if="showRouting === '1'">
        <Header/>
    </div>
    <div v-if="showRouting === '0'">
        <Header/>
        <component :is="currentView"/>
    </div>
</template>
