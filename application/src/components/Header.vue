<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const headerEl = ref(null)
let prevHeight = 0

useResizeObserver(headerEl, (entries) => {
    if (entries.length < 1) {
        return
    }

    const obsHeaderEl = entries[0]
    const {height} = obsHeaderEl.contentRect

    if (height === prevHeight) {
        return
    }

    handleHeaderSizeChange()

    prevHeight = height
})

    const handleHeaderSizeChange = () => {
        const navigation = document.querySelector(".banner") as HTMLElement
        if (!navigation) {
            return
        }

        const navigationHeight = navigation.offsetHeight;
        document.documentElement.style.setProperty(
            "--scroll-padding",
            navigationHeight + "px"
        )
    }

const showRouting = ref(true)
</script>

<template>
    <div class="front_el">
    <header ref="headerEl" class="banner">
        <b class="left_text"><a href="#">SHerlihy</a></b>
        <span/>
        <div class="right_flex">
            <p>steven_herlihy@yahoo.com</p>
            <p class="details_partition">|</p>
            <p>+44 73544 30588</p>
        </div>
    </header>

    <div class="appended">
    <button @click="showRouting = !showRouting">
        {{showRouting ? '&#10506; Hide' : '&#10507; Show'}}
    </button>
    <div v-if="showRouting">
        <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/infrastructure">Infrastructure</a></li>
        </ul>
    </div>
    </div>
    </div>
</template>

<style scoped>
.front_el {
    z-index: 99;
    position: sticky;
    top: 0;
}

.banner {
    background-color: rgba(60, 30, 60);

    display: grid;
    grid-template-columns: auto auto auto;

    justify-content: space-between;
    align-content: center;

    padding: 1rem;
}

.appended {
    position: absolute;
}

a {
    color: currentcolor;
}

@media (prefers-color-scheme: light) {
    .banner{
        color: #fff;
    }
}

.right_flex {
    display: flex;
    flex-direction: row;

    height: 100%;

    align-items: center;
    align-content: center;
}

.left_text {
    font-size: 1.5rem;
}

.details_partition {
    margin: 0 1rem;

}

.head_text {
    padding: 0 1rem;
}

@media screen and (max-width: 900px) {
.banner {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;

        justify-items: center;
        justify-content:unset;
}

    .right_flex {
        flex-direction: column;
    }

    .details_partition {
        display: none;
    }
}
</style>
