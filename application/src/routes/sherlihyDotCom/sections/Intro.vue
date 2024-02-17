<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
</script>

<template>
    <Introduction>
        <template #image>
            <img src="/public/map-pin.png" />
        </template>
        <template #text>
            <div class="txt_container">
            <div class="txt_mask">
                <span class="reveal"/>
                <span class="mask"/>
            </div>
            <p >
                You're here! Simple as this site is I did make some key design decisons and added a few non-funtional features to create a smooth development experience.
            </p>
            </div>
        </template>
    </Introduction>
</template>

<style scoped>
.txt_container {
    position: relative;
}

.txt_mask {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}

.reveal {
    height: 100%;
    width: 100%;

    animation: fat-right 1500ms;
}

.mask {
    width: 0%;

    animation: thin-right 1500ms;
}

@keyframes fat-right {
    0% {
        width: 0%;
    }

    50% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

@keyframes thin-right {
    0% {
        width: 100%;
        visibility: visible;

        border-top: 0px solid Canvas;
        border-left: 0px solid transparent;
        border-bottom: 100px solid Canvas;
        border-right: 0px solid Canvas;
    }

    50% {
        width: 100%;

        border-left: 50px solid transparent;
        border-bottom: 100px solid Canvas;
        border-right: 50px solid Canvas;
    }

    100% {
        width: 0%;

        border-left: 0px solid transparent;
        border-bottom: 100px solid Canvas;
        border-right: 0px solid Canvas;
    }
}

img {
    padding: 30px;
    animation: throb 1000ms;
}

@keyframes throb {
    0% {
        transform: scale(0.5);
    }

    30% {
        transform: scale(1.3);
    }

    100% {
        transform: scale(1);
    }
}
</style>
