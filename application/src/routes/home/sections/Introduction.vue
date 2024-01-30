<script setup lang="ts">
    import ProfileImage from '../components/ProfileImage.vue'
</script>

<template>
    <section>
        <ProfileImage />
        <article class="grid_auto_center">
            <p class="grid_center_content">
            Welcome, here I reflect on projects I have worked on. The purpose of these reflections is to attribute my progression and learning to tangible artifacts.
            </p>
            <br/>
        </article>
    </section>
</template>

<style scoped>
section {
    height: 65vh;
    display: flex;
    flex-direction: row;

    align-items: center;
}

article {
    overflow: hidden;
}

.grid_auto_center {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    grid-template-rows: 1fr auto 1fr;
}

.grid_center_content {
    grid-column: 2;
    grid-row: 2;

    animation: 1s ease-out 0s 1 slideInLeft;
}

@media screen and (max-width: 1200px) {
    section {
        flex-direction: column;
        justify-content: center;
    }

    .portrait_img {
        align-self: center;
        margin-bottom: 1rem;
        margin-right: 0;
    }

    .grid_center_content {
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
