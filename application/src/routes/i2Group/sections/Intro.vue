<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
</script>

<template>
    <Introduction>
        <template #image>
            <div>
            <img src="/public/spiderweb.png" />
            <img src="/public/crimes1.png" class="drop_bounce1"/>
            <img src="/public/crimes2.png" class="drop_bounce2"/>
            <img src="/public/crimes3.png" class="drop_bounce3"/>
            </div>
        </template>
        <template #text>
            <p >
                Imagine that scene from Minority Report where Tom Cruise is looking at footage of "future crimes" but instead of it being a 3D hologram it's a 2D, on a browser and only shows text.
            </p>
        </template>
    </Introduction>
</template>

<style scoped>
div {
    position: relative;
    height: 450px;
    width: 450px;
}

img {
    position: absolute;
}

.drop_bounce1{
    animation: drop-bounce 1000ms, drop-sway-a 1000ms;
}

.drop_bounce2{
    animation: drop-bounce 1200ms, drop-sway-b 1200ms;
}

.drop_bounce3{
    animation: drop-bounce 800ms;
}

@keyframes drop-bounce {
    0% {
        top: -100px;
    }

    33% {
        top: 5px;
    }

    69% {
        top: -10px;
    }

    100% {
        top: 0px;
    }
}

@keyframes drop-sway-a {
    0% {
        left: 0px;
    }

    33% {
        left: -2px;
    }

    69% {
        left: 2px;
    }

    100% {
        left: 0px;
    }
}

@keyframes drop-sway-b {
    0% {
        left: 0px;
    }

    33% {
        left: 2px;
    }

    69% {
        left: -2px;
    }

    100% {
        left: 0px;
    }
}
</style>
