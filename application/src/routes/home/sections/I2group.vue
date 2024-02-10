<script setup lang="ts">
import ProjectDesc from "../../../components/ProjectDesc.vue"
import Carousel from "../../../components/Carousel.vue"

import Content from "../components/Content.vue"

const i2Points = [
    "Story lead",
    "Rapid prototyping",
    "Agile",
    "SDK development and tutorial author",
    "Test Driven Development (TDD)",
    "React",
]

let i2Imgs = [
    `../../public/i2/color_picker.png`,
    `../../public/i2/i2Web.png`,
    `../../public/i2/i2WebSaveDrk.png`
]

const shiftLeft = (imgPaths: string[]) => {
    if (imgPaths.length < 1) {
        return
    }

    const swap = imgPaths.pop() as string
    imgPaths.unshift(swap)
}

const shiftRight = (imgPaths: string[]) => {
    if (imgPaths.length < 1) {
        return
    }

    const swap = imgPaths.shift() as string
    imgPaths.push(swap)
}
</script>

<template>
        <Content linkId="i2Group">
            <template v-slot:left>
                <ProjectDesc 
                heading="Frontend Web Developer"
                linkId="/i2Group"
                >
                    <p>
                        Intelligence software for use in a web browser that enabled customers to create graph/web diagrams of intelligence data.
                    </p>
                    <br/>
                    <ul>
                        <li v-for="point in i2Points">
                            {{ point }}
                        </li>
                    </ul>
                </ProjectDesc>
            </template>
            <template v-slot:right>
            <Carousel @shift-left="shiftLeft(i2Imgs)" @shift-right="shiftRight(i2Imgs)" :imgs="i2Imgs" :imgWidthPx="400" :imgGapPx="30" />
            </template>
        </Content>
</template>
