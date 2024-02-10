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
                            After reading "Fundementals of Software Architecture: An Engineering Approach" by Mark Richards and Neal Ford I wanted to understand software architecture on a deeper level and resolved to create some architectures detailed in the book.
                        </p>
                        <br/>
                        <p>
                            I had professional experience of frontend devepment and private experience of backend development, however, I had no expereince of creating infrastructure.
                        </p>
                        <br/>
                        <p>
                            After following some guided tutorials to create infrastructure using cloud based services I realised that unless I recorded how I created infrastructure for a project I would forget important details by the time I had to revisit the project infrastructure. After a little research I discoved the concept of "Infrastructure as Code". 
                        </p>
                        <br/>
                        <p>
                        After looking at techonologies used I decided I would try to use Terraform to manage my infrastructure as code due to it's maturity, reusable modules and iterative coding capabilities.
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
