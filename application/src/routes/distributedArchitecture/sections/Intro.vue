<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
</script>

<template>
    <Introduction>
        <template #image>
            <div>
                <img src="/public/robo3.png" />
                <img src="/public/robo2.png" />
                <img src="/public/robo1.png" />
                <img src="/public/boop3.png" />
                <img src="/public/boop2.png" />
                <img src="/public/notAToaster.png" />
                <img src="/public/queueBarrier.png" />
            </div>
        </template>
        <template #text>
            <p >
                The concept of managing data can start as a simple idea, however, when considering security and compliance management becomes complex and complex solutions are required.
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
</style>
