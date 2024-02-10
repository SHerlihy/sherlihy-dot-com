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
                    Developing the core functionality was a simple matter, however, after I had proved it was possible to crete the functionality I moved on the considering how it would work as part of a third party codebase. Which presented a core issue of how or if I preserve the layout of the project the component is applied to.
                </p>
                        <br />
                <p>
                    Ultimately I decided preserving layout was vital to the user experience. It led to a more complex design and implementation being required but it was unavoidable.
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

