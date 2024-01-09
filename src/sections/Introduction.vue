<script setup lang="ts">
</script>

<template>
    <section>
        <img src="../../public/sherlihy.jpeg"/>
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
    display: flex;
    flex-direction: row;
}

img {
    max-width: 350px;
    border-radius: 10%;

    margin-right: 1rem;
}

.grid_auto_center {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    grid-template-rows: 1fr auto 1fr;
}

.grid_center_content {
    grid-column: 2;
    grid-row: 2;

}

@media screen and (max-width: 1200px) {
section {
    flex-direction: column;
}

    img {
        align-self: center;
        margin-bottom: 1rem;
        margin-right: 0;
    }
}
</style>
