<script setup lang="ts">
import Content from '../../../components/Content.vue'
import ProjectDesc from '../../../components/ProjectDesc.vue'
import ClickImg from '../../../components/ClickImg.vue'

const velmaMode = [
    "Accessability",
    "CSS",
    "React",
]
</script>

<template>
            <Content mongo>
                <template v-slot:right>
                    <ProjectDesc 
                    heading="Text Magnifier"
                    linkId="/velmaMode"
                    >
                        <p>
                            A wrapping component and state control system that allows desired text to be resized by a user.
                        </p>
                        <br/>
                <p>
                    Developing the core functionality was a simple matter, however, after I had proved it was possible to crete the functionality I moved on the considering how it would work as part of a third party codebase. Which presented a core issue of how or if I preserve the layout of the project the component is applied to.
                </p>
                        <br />
                <p>
                    Ultimately I decided preserving layout was vital to the user experience. It led to a more complex design and implementation being required but it was unavoidable.
                </p>
                        <ul>
                            <li v-for="point in velmaMode">
                                {{ point }}
                            </li>
                        </ul>
                    </ProjectDesc>
                </template>
                <template v-slot:left>
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
