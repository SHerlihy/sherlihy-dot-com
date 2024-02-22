<script setup lang="ts">
    import ProjectDesc from "../../components/ProjectDesc.vue"
    import Content from "../../components/Content.vue"
</script>

<template>
    <main>
        <br/>
        <Content mongo>
            <template #text>
                <ProjectDesc 
                heading="Why DRY"
                linkId="/whydry"
                >
                    <p>
                        I do not like D.R.Y, the "Don't Repeat Yourself" mindset is poison that creates a needless barrier to the benefits gained by responsibly using single sources of truth.
                    </p>
                    <br/>
                    <p>
                        I do not see "DRYing" code as the same as leveraging the benifits of using single sources of truth. Creating code with a DRY mindset narrows an engineers perspective to immediately prevent the duplication of code written and functionality implemented. Leveraging the benifits of using single sources of truth, however, allows an engineer to delay the refactoring of code in order to consider the different ways code can be refactored to intelligently choose single sources of truth that suit the context of the system.
                    </p>
                    <br/>
                    <p>
                        I regard D.R.Y as a poison because the immediate coupling it promotes narrows an engineer's perspective.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template #image>
                <p></p>
            </template>
        </Content>
    </main>
</template>

