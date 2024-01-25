<script setup lang="ts">
import Content from "../components/Content.vue"
import ProjectDesc from "../components/ProjectDesc.vue"
import Carousel from "../components/Carousel.vue"

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
        <Content>
            <template v-slot:left>
                <ProjectDesc 
                heading="Frontend Web Developer"
                linkId="i2Grp"
                >
                    <p>
                        Intelligence software for use in a web browser that enabled customers to create graph/web diagrams
                        of intelligence data.
                    </p>
                    <br />
                    <p>
                        As this was my first job in sorftware development I learned much agile methodologies, collaboration tools, creating story specs, leading stories, various frontend technologies and perspectives on how to create professional software.
                    </p>
                    <br/>
                    <p>
                        The largest struggle I had in this position was accountion for state mutations. For performance state and data was mutable and able to be mutated by several internal and external libraries. Furthermore, knowledge of systems created was primarily "tribal knowledge" but as the application had been in development for years it was rare any developer would have comprehensive knowledge of a system. To account for this I decided to produce mermaid diagrams detailing the state flow of systems when preparing story specifications.
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
