<script setup lang="ts">
    import ClickImg from '../../../components/ClickImg.vue'
</script>

<template>
    <div class="container_padding">
    <div class="profile_img_container">
        <div class="constrained">
        <img src="../../../../public/intro/sherlihy.png"/>
            </div>
    </div>
    </div>
</template>

<style scoped>
img {
    min-height: 350px;
    max-height: 350px;
    min-width: 350px;
    max-width: 350px;
    animation: 1s ease-out 0s 1 slideInUp;
}



.container_padding {
    padding: 1rem;
}

.profile_img_container{
    position: relative;

    display: flex;
    flex-direction: column-reverse;

    min-height: 250px;
    max-height: 250px;
    min-width: 250px;
    max-width: 250px;
    background-color: rgba(128, 128, 160, 0.7);

    border: 10px solid rgba(60, 30, 60, 1);
    border-radius: 50%;
}

.constrained {
    position: absolute;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    min-height: 350px;
    max-height: 350px;
    min-width: 230px;
    max-width: 230px;

    overflow: hidden;

    border-radius: 0 0 450px 450px;
}

@keyframes slideInUp {
  0% {
    transform: translateY(200%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
