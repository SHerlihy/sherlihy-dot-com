<script setup lang="ts">
    import ProjectDesc from "../../../components/ProjectDesc.vue"
    import Content from "../../../components/Content.vue"
    import ClickImg from "../../../components/ClickImg.vue"

    defineProps<{ 
        mongo?: boolean
    }>()
</script>

<template>
        <Content :mongo="mongo">
            <template #text>
                <ProjectDesc 
                heading="Innovation"
                linkId="/innovation"
                >
                    <p>
                        The largest struggle I had in this position was accountion for state mutations. For performance state and data was mutable and able to be mutated by several internal and external libraries. Furthermore, knowledge of systems created was primarily "tribal knowledge" but as the application had been in development for years it was rare any developer would have comprehensive knowledge of a system. To account for this I decided to produce mermaid diagrams detailing the state flow of systems when preparing story specifications.
                </p>
                <br/>
                </ProjectDesc>
            </template>
            <template #image>
                <ClickImg path="i2/innovationSoup.png"/>
            </template>
        </Content>
</template>
