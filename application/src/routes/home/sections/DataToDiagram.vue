<script setup lang="ts">
import ProjectDesc from '../../../components/ProjectDesc.vue'
import ClickImg from "../../../components/ClickImg.vue"

import Content from '../components/Content.vue'

defineProps<{ 
    mongo?: boolean
}>()

const dataStructToDiagram = [
    "Mermaid.js",
    "Golang",
]
</script>

<template>
        <Content :mongo="mongo" linkId="/pointerstodiagram">
            <template v-slot:left>
                <ProjectDesc 
                heading="Pointer Data Structure to Diagram" 
                linkId="/pointersToDiagrams"
                >
                    <p>
                        While implementing solutions using algorithms with memory pointers I found as the size of data structures increases errors become more difficult to identify and patterns in these errors also become more difficult to identify.
                    </p>
                <br/>
                <p>
                To better visualise the data beyond "log statements" I decided to create some software that could accept such memory pointer based data structures and produce graphical representations of the data.
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
