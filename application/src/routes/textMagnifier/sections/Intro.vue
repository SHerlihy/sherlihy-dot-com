<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
</script>

<template>
    <Introduction>
        <template #image>
            <div>
                <img src="/velmaMode/intro/velmaNoGlasses.png" class="blur"/>
                <img src="/velmaMode/intro/velmaNoGlasses.png" class="mask blur_up"/>
                <img src="/velmaMode/intro/velmaGlasses.png" class="move_up"/>
            </div>
        </template>
        <template #text>
            <p >
                The core idea of this project was to provide users with the control to change the size of text and at the same time respect the existing layout of the applications the wrapping component is used in.
            </p>
        </template>
    </Introduction>
</template>

<style scoped>
div {
    position: relative;
    height: 350px;
    width: 350px;
}

img {
    position: absolute;
}

.blur {
    animation: blur-in 3000ms;
}

.mask {
    mask-image: url("/velmaMode/intro/velmaMask.png");

    mask-size: 350px 350px;
}

.move_up {
    animation: move-up 1500ms;
}

.blur_up {
    animation: blur-up 1500ms;
}

@keyframes blur-in {
    0% {
        filter: blur(4px);
    }

    50% {
        filter: blur(4px);
    }

    100% {
        filter: blur(0px);
    }
}

@keyframes blur-up {
    0% {
        mask-position: 0 100px;
    }

    100% {
        mask-position: 0 0px;
    }
}

@keyframes move-up {
    0% {
        top: 100px;
    }

    100% {
        top: 0px;
    }
}
</style>
