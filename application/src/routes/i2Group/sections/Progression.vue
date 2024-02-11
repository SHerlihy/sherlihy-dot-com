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
                heading="Progression"
                linkId="/progression"
                >
                    <p>
                        This was my first web development role. On enetering this position I knew Javascript, I had some basic experience with some web APIs and some experience using React. On concluding this position I had experience using Typescript in a highly mutable context, developed algorithms to manipulate graph data and led my team to create new frontend experiences.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template #image>
                <ClickImg path="../../../../public/progressMountain.png"/>
            </template>
        </Content>
</template>
