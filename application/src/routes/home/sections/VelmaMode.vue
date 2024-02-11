<script setup lang="ts">
import ProjectDesc from '../../../components/ProjectDesc.vue'
import ClickImg from '../../../components/ClickImg.vue'

import Content from "../components/Content.vue"

defineProps<{ 
    mongo?: boolean
}>()

const velmaMode = [
    "Accessability",
    "CSS",
    "React",
]
</script>

<template>
            <Content :mongo="mongo" linkId="textmag">
                <template v-slot:text>
                    <ProjectDesc 
                    heading="Text Magnifier"
                    linkId="/velmaMode"
                    >
                        <p>
                    While watching a YouTube video from Kevin Powell (<a href="https://www.youtube.com/watch?v=N5wpD9Ov_To">CSS units</a>) I really wanted to remember the difference between "em" and "rem" he highlighted and decided creating a project would be a great way to remember.
                        </p>
                        <br/>
                        <p>
                            This is that project, where a wrapping component and state control system will wrap content with css attributes using "em" values and will then allow the content to be resized by resizing those attributes using "em" values.
                        </p>
                        <br/>
                        <ul>
                            <li v-for="point in velmaMode">
                                {{ point }}
                            </li>
                        </ul>
                    </ProjectDesc>
                </template>
                <template v-slot:image>
                    <div class="duo_image">
                        <ClickImg class="clickImg right_top_img" path="../../public/velmaMode/velmaModeDisabled.png" />
                        <ClickImg class="clickImg left_low_img" path="../../public/velmaMode/velmaModex4.png" />
                    </div>
                </template>
            </Content>
</template>


<style scoped>
.duo_image {
    margin: 1rem;
    min-width: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

    justify-items: center;
    align-items: center;

    justify-content: space-between;
    align-content: center;
}

.left_low_img {
    grid-column: 1/6;
    grid-row: 4/9;
}

.right_top_img {
    grid-column: 5/9;
    grid-row: 1/5;
}

.left_top_img {
    grid-column: 1/4;
    grid-row: 1/4;
}

.right_low_img {
    grid-column: 3/9;
    grid-row: 3/9;
}

@media screen and (max-width: 1200px) {
    .duo_image {
        display: flex;
        flex-direction: column;
    }

    .clickImg {
        margin-bottom: 1rem;
    }
}
</style>
