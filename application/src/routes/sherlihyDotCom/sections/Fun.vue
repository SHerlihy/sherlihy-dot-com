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
                heading="Fun"
                linkId="fun"
                >
                    <p>
                        I want to be excited to update this website and I believe the best way to do this is to commit to adding a few processes to the framework that I find fun whenever creating a new section.
                    </p>
                    <br/>
                    <p>
                        For each "page" I have an introductory section where I play with the css of an image and text. I've found it rare to be affored the opportunity to create something new with css for aesthietic purposes in most professional positions.
                    </p>
                </ProjectDesc>
            </template>
            <template #image>
                <ClickImg path="../../../../public/funWizard.png"/>
            </template>
        </Content>
</template>
