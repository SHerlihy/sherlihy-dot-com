<script setup lang="ts">
    import Intro from "./sections/Intro.vue"
    import Perspective from "./sections/Perspective.vue"
    import Progression from "./sections/Progression.vue"
    import Innovation from "./sections/Innovation.vue"
</script>

<template>
    <main>
        <br/>
            <Intro/>
        <br/>
        <div class="light_bg">
            <br/>
            <Perspective/>
            <br/>
        </div>
        <br/>
        <Progression mongo/>
        <br/>
        <div class="light_bg">
            <br/>
            <Innovation/>
            <br/>
        </div>
    </main>
</template>
