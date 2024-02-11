<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
</script>

<template>
    <Introduction>
        <template #image>
            <img src="/public/velma.png" />
        </template>
        <template #text>
            <p >
                The core idea of this project was to provide users with the control to change the size of text and at the same time respect the existing layout of the applications the wrapping component is used in.
            </p>
        </template>
    </Introduction>
</template>
