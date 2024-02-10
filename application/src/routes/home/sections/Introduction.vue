<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
    import ProfileImage from '../components/ProfileImage.vue'
</script>

<template>
    <Introduction>
        <template #image>
            <ProfileImage/>
        </template>
        <template #text>
            <p>
                Welcome, here I reflect on projects I have worked on. The purpose of these reflections is to attribute my progression and learning to tangible artifacts.
            </p>
        </template>
    </Introduction>
</template>

<style scoped>
p {
    animation: 1s ease-out 0s 1 slideInLeft;
}

@media screen and (max-width: 1200px) {
    p {
    animation: 1s ease-out 0s 1 slideInDown;
    }
}

@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
