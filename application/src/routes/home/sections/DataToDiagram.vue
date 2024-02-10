<script setup lang="ts">
import Content from '../../../components/Content.vue'
import ProjectDesc from '../../../components/ProjectDesc.vue'
import ClickImg from "../../../components/ClickImg.vue"

const dataStructToDiagram = [
    "Mermaid.js",
    "Golang",
]
</script>

<template>
        <Content>
            <template v-slot:left>
                <ProjectDesc 
                heading="Pointer Data Structure to Diagram" 
                linkId="/pointersToDiagrams"
                >
                    <p>
                        A combination of tools to help see a data structure made of memory pointers to help debugging such a data structure. The first tool creates a string representation of a data structure and the second tool creates a diagram from a string representation of a data structure.
                    </p>
                        <br />
                        <ul>
                            <li v-for="point in dataStructToDiagram">
                                {{ point }}
                            </li>
                        </ul>
                </ProjectDesc>
            </template>
            <template v-slot:right>
                <div class="multi_image">
                    <ClickImg class="left_img" path="../../public/mermaidizer/nodesToStrTest.png" />
                    <ClickImg class="right_img" path="../../public/mermaidizer/mermaidPointers.png" />
                </div>
            </template>
        </Content>
</template>

<style scoped>
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

@media screen and (max-width: 1200px) {
    .multi_image {
        display: flex;
        flex-direction: column;
    }

    .left_img {
        margin-bottom: 1rem;
    }

    .right_img {
        margin-bottom: 1rem;
    }
}
</style>
