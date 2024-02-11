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
                        Creating new functionality, leading the team through stories and promoting knowledge exchange for internal and external stakeholders.
                    </p>
                    <p>
                        As this was my first job in sorftware development I learned much agile methodologies, collaboration tools, creating story specs, leading stories, various frontend technologies and perspectives on how to create professional software.
                    </p>
                    <br/>
                    <p>
                        The largest struggle I had in this position was accountion for state mutations. For performance state and data was mutable and able to be mutated by several internal and external libraries. Furthermore, knowledge of systems created was primarily "tribal knowledge" but as the application had been in development for years it was rare any developer would have comprehensive knowledge of a system. To account for this I decided to produce mermaid diagrams detailing the state flow of systems when preparing story specifications.
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
