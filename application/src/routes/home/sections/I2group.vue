<script setup lang="ts">
import ProjectDesc from "../../../components/ProjectDesc.vue"
import Carousel from "../../../components/Carousel.vue"

import Content from "../components/Content.vue"

defineProps<{ 
    mongo?: boolean
}>()

let i2Imgs = [
    `i2/color_picker.png`,
    `i2/i2Web.png`,
    `i2/i2WebSaveDrk.png`
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
        <Content :mongo="mongo" linkId="i2Group">
            <template v-slot:text>
                <ProjectDesc 
                heading="Frontend Web Developer"
                linkId="/i2Group"
                >
                    <p>
                        I was a frontend developer for a browser based application that allowed customers to create graphs for the purpose of indentifying criminal behaviour.
                        I also contributed to developing and documenting an SDK that allowed those same customers to create their own functionaliity in the application through plugins.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template v-slot:image>
            <Carousel @shift-left="shiftLeft(i2Imgs)" @shift-right="shiftRight(i2Imgs)" :imgs="i2Imgs" :imgWidthPx="400" :imgGapPx="30" />
            </template>
        </Content>
</template>
