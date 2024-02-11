<script setup lang="ts">
    import ProjectDesc from "../../../components/ProjectDesc.vue"
    import Content from "../../../components/Content.vue"
</script>

<template>
        <Content>
            <template #right>
                <ProjectDesc 
                heading="Inspiration"
                linkId="/inspiration"
                >
                    <p>
                        I wouldn't have thought of making this component if I hadn't worked in a position commited to user accessibility and I hadn't taken an interest in the specifics of CSS measurements. Similarly, the animation of me poping up on this websites home page wouldn't have been made if I hadn't seen a similar effect on a different website.
                    </p>
                    <br/>
                    <p>
                        Creativity plays a much larger role in my development work than I originally thought when I decided to become a developer. I now believe knowing what is possible is more important than knowing specific technologies intimately.
                    </p>
                    <br/>
                </ProjectDesc>
            </template>
            <template #left>
                <p>
                    images of css stuff???
                </p>
            </template>
        </Content>
</template>

