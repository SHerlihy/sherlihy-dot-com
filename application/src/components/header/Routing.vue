<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUrlSearchParams } from '@vueuse/core';
import { ref, watch } from 'vue';

const params = useUrlSearchParams('history')
const showRouting = ref(params.showRouting)

watch(params, async(newParams) => {
    showRouting.value = newParams.showRouting
})

function handleToggleRoutes() {
    if (!params.showRouting) {
        params.showRouting = '1'
        return
    }

    if (params.showRouting === '0') {
        params.showRouting = '1'
        return
    }

    if (params.showRouting === '1') {
        params.showRouting = '0'
        return
    }
}
</script>

<template>
    <div class="container_routing">
        <p class="min-width_set">Infrastructure</p>
        <button @click="handleToggleRoutes">
            {{showRouting === '1' ? '&#10506; Hide' : '&#10507; Show'}}
        </button>
        <div v-if="showRouting === '1'" class="route_links_container">
            <ul class="route_links_list">
                <li><RouterLink to="/">Home</RouterLink></li>
                <li><RouterLink to="shdotcom">SHerlihyDotCom</RouterLink></li>
                <li><RouterLink to="i2Group">i2 Group</RouterLink></li>
                <li><RouterLink to="distArchi">Distributed Architecture</RouterLink></li>
                <li><RouterLink to="pointerstodiagram">Pointers To Diagram</RouterLink></li>
                <li><RouterLink to="textmag">Text Magnifier</RouterLink></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
}

a {
    color: currentcolor;
}
button {
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    background-color: Canvas;
    color: colorscheme;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
}

button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

button:active {
    transform: scale(0.99);
}

.container_routing {
    width: 100%;
    display: flex;
    flex-direction: column;

    background-color: Canvas;
    border-bottom-right-radius: 15%;
}

.min-width_set {
    height: 0;
    padding: 0 1rem;

    visibility: hidden;
}

.route_links_container {
    display: table;
    margin-left: auto;
    margin-right: auto;

    padding-bottom: 1rem;
}

.route_links_container:after {
    border-bottom: 3px solid rgba(128, 128, 128, 0.5); 
    content: ''; 
    display: block; 
    margin-left: 25%; 
    width: 50%;
}

.route_links_list {
    padding: 1rem;
}
</style>
