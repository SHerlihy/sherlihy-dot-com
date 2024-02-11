<script setup lang="ts">
    import Intro from "./sections/Intro.vue"
    import Background from "./sections/Background.vue"
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
            <Background/>
            <br/>
        </div>
        <br/>
        <Progression/>
        <br/>
        <div class="light_bg">
            <br/>
            <Innovation/>
            <br/>
        </div>
    </main>
</template>
