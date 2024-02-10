<script setup lang="ts">
    import Intro from "./sections/Intro.vue"
    import Fun from "./sections/Fun.vue"
    import Documentation from "./sections/Documentation.vue"
</script>

<template>
    <main>
        <br/>
            <Intro/>
        <br/>
        <div class="light_bg">
            <br/>
                <Fun/>
            <br/>
        </div>
        <br/>
        <Documentation/>
        <br/>
    </main>
</template>
