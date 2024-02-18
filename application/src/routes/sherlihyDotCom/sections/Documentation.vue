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
                heading="Documentation"
                linkId="documentation"
                >
                    <p>
                        I have two prevailing reasons for the documentation I've created in this project. The first is for transparency, specifically so sombody who is not me can undestand the wonderful work I've put into this website more easily. The second is for my own benifit and this has several meanins to me.
                    </p>
                    <br/>
                    <p>
                        Memory doesn't last forever and I don't find it fun to constantly read through every detail, every line of code to remember the broad purpose of my previous work. So creating documentation for a future version of myself is something I'm willing to invest the time in and I do see it as an investment because I'm doing it to prevent having to read code directly and come up/try to remember design descisions that have already been made.
                    </p>
                    <br/>
                    <p>
                        I've found producing good documentation to lead to better software. In writting the documentation it requires reflection, often leads to identifying oversights and creates a self feedback mechanism for promoting quality work. In the long term it allows me to create more sophisticated software if I have documents that allow me to understand systems "at a glance" as I'm not having to allocate a portion of my memory and concentration to remember how a system works while also trying to plan new functionality.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template #image>
                <ClickImg path="sherlihyDotCom/documentationGorilla.png"/>
            </template>
        </Content>
</template>
