<script setup lang="ts">
    import ProjectDesc from "../../../components/ProjectDesc.vue"
    import Content from "../../../components/Content.vue"
    import ClickImg from "../../../components/ClickImg.vue"
</script>

<template>
        <Content>
            <template #right>
                <ProjectDesc 
                heading="Limitations"
                linkId="/limitations"
                >
                    <p>
                        On entering this project I had a little experience on Infrastructure as Code and using Terraform to provision AWS servers. I learned alot during the project and after creating the reverse proxy I had been taken to my limit and beyond.
                    </p>
                    <br/>
                    <p>
                        Although the the project worked as a proof of concept I recognised there was alot beyond the "happy path" of expected behaviour and usage that I had no way of understanding. Due to this I made the decision to step back from this project to learn more about AWS and traditional networking as I struggled most in those areas.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template #left>
                <ClickImg path="../../../../public/limitationsFlying.png"/>
            </template>
        </Content>
</template>
