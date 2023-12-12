<script setup lang="ts">
import Header from './components/Header.vue'
import Content from './components/Content.vue'

const i2Points = [
            "Story lead",
            "Rapid prototyping",
            "Agile",
            "SDK development and tutorial author",
            "Test Driven Development (TDD)",
            "React",
            ]
</script>

<template>
  <Header/>
    <main>

    <Content 
    heading="Frontend Web Developer"
        v-bind:content="i2Points"
    >
        <div class="multi_image">
        <img class="head_img" src="../public/i2/color_picker.png"/>
        <img class="left_img" src="../public/i2/i2Web.png"/>
        <img class="right_img" src="../public/i2/i2WebSave.png"/>
        </div>
    </Content>
    </main>
</template>

<style scoped>
main {
    margin: 3vw;
}

.head_img {
    grid-column-start: 2;
    grid-column-end: 4;

    grid-row-start: 1;
    grid-row-end: 2;
}

.foot_img {
    grid-column-start: 2;
    grid-column-end: 4;

    grid-row-start: 3;
    grid-row-end: 4;
}

.left_img {
    grid-column-start: 1;
    grid-column-end: 3;
}

.right_img {
    grid-column-start: 3;
    grid-column-end: 5;
}

.multi_image {
    padding: 1rem;
    min-width: 300px;
    width: 20vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    column-gap: 2rem;
    row-gap: 2rem;

    justify-items: center;
    align-items: center;

    justify-content: space-between;
    align-content: center;
}

.grid_header {
    grid-area: header;
}

.grid_footer {
    grid-area: footer;
}

img {
    max-height: 100%;
    max-width: 100%;
}
</style>

<style>

* {
    margin: 0;
    padding: 0;
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

body {
  min-width: 320px;
  min-height: 100vh;
}

li {
    list-style-position: inside;
}

</style>
