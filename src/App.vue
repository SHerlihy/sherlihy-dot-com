<script setup lang="ts">
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import ProjectDesc from './components/ProjectDesc.vue'

const i2Points = [
            "Story lead",
            "Rapid prototyping",
            "Agile",
            "SDK development and tutorial author",
            "Test Driven Development (TDD)",
            "React",
            ]

const velmaMode = [
    "Accessability",
    "CSS",
    "React",
]

const authAndProfile = [
    "MemoryDB",
    "MySQL",
    "Golang",
]

const dataStructToDiagram = [
    "Mermaid.js",
    "Golang",
]

</script>

<template>
  <Header/>
    <main>

    <Content>
<template v-slot:left>
                <ProjectDesc heading="Frontend Web Developer">
                    <p>
                        Intelligence software for use in a web browser that enabled customers to create graph/web diagrams of intelligence data.
                    </p>
                    <br/>
                    <ul>
                        <li v-for="point in i2Points">
                            {{point}}
                        </li>
                    </ul>
                </ProjectDesc>
</template>
<template v-slot:right>
        <div class="multi_image">
        <img class="head_img" src="../public/i2/color_picker.png"/>
        <img class="left_img" src="../public/i2/i2Web.png"/>
        <img class="right_img" src="../public/i2/i2WebSaveDrk.png"/>
        </div>
</template>
    </Content>

        <br/>
        <br/>

        <div class="light_bg">
    <Content>
<template v-slot:right>
                <ProjectDesc heading="Text Magnifier">
                    <p>
                        A wrapping component and state control system that allows desired text to be resized by a user.
                    </p>
                    <br/>
                    <ul>
                        <li v-for="point in velmaMode">
                            {{point}}
                        </li>
                    </ul>
                </ProjectDesc>
            </template>
<template v-slot:left>
        <div class="duo_image">
        <img class="right_top_img" src="../public/velmaMode/velmaModeDisabled.png"/>
        <img class="left_low_img" src="../public/velmaMode/velmaModex4.png"/>
        </div>
</template>
    </Content>
    </div>

        <br/>

        <Content>
            <template v-slot:left>
                <ProjectDesc heading="Distributed Service Architecture">
                    <p>
                        A REST based service Architecture designed to seperate sensitive data used of authorization (name, email, etc) from non-protected data.
                    </p>
                    <br/>
                    <ul>
                        <li v-for="point in authAndProfile">
                            {{point}}
                        </li>
                    </ul>
                </ProjectDesc>
            </template>
            <template v-slot:right>
            </template>
        </Content>

    </main>
</template>

<style scoped>
.light_bg {
    background-color: rgba(255,255,255,0.1);
}

.multi_image {
    padding: 1rem;
    min-width: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    column-gap: 2rem;
    row-gap: 2rem;

    justify-items: center;
    align-items: center;

    justify-content: space-between;
    align-content: center;
}

.head_img {
    grid-column: 2/4;
    grid-row: 1/3;
}

.foot_img {
    grid-column: 2/4;
    grid-row: 5/7;
}

.left_img {
    grid-column: 1/3;
    grid-row: 3/5;
}

.right_img {
    grid-column: 3/5;
    grid-row: 3/5;
}


.duo_image {
    margin: 1rem;
    min-width: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

    justify-items: center;
    align-items: center;

    justify-content: space-between;
    align-content: center;
}

.left_low_img {
    grid-column: 1/6;
    grid-row: 4/9;
}

.right_top_img {
    grid-column: 5/9;
    grid-row: 1/5;
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
