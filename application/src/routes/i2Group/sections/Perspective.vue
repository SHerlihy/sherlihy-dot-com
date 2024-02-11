<script setup lang="ts">
    import ProjectDesc from "../../../components/ProjectDesc.vue"
    import Content from "../../../components/Content.vue"
    import ClickImg from "../../../components/ClickImg.vue"
</script>

<template>
        <Content>
            <template #right>
                <ProjectDesc 
                heading="Perspective"
                linkId="/perspective"
                >
                    <p>
                        When starting this position I focused heavily on improving my technical capabilities to be more capable in my role and to better understand the conversations of more senior developers.
                    </p>
                    <br/>
                    <p>
                        Though valuable, improving my technical capabilities didn't yield as much progress as I had expected. While talking to more senior developers I realised, it was their perspective that accounted for most of the difference between us.
                    </p>
                    <br/>
                    <p>
                        To align my perspective more with the project I decided to take on the responsibility of leading stories. This led to me understanding the codebase better, understanding the customers better and overall did improve my perspective in relation to the project.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template #left>
                <ClickImg path="../../../../public/perspective.png"/>
            </template>
        </Content>
</template>
