import { computed, ref } from 'vue'

import Home from './home/Home.vue'
import Infrastructure from './infrastructure/Infrastructure.vue'

const useUrlHash = () => {
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
    
    return currentView
}

export default useUrlHash
