<script setup lang="ts">
    import ProjectDesc from "../../../components/ProjectDesc.vue"
    import Content from "../../../components/Content.vue"
</script>

<template>
        <Content>
            <template #right>
                <ProjectDesc 
                heading="Background"
                linkId="/background"
                >
                    <p>
                        Prior to this project I didn't have much experience developing command line tools but I was comfortable using Mermaid.js. I was a little less confident with Golang as the majority of my experience was with algorithms but once I familiarised myself with standatd libraries to interact with the operating system I gained confidence and was able to make a working set of tools.

                    </p>
                </ProjectDesc>
            </template>
            <template #left>
                <p>
                    images of css stuff???
                </p>
            </template>
        </Content>
</template>
