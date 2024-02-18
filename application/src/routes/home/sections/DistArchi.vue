<script setup lang="ts">
import ProjectDesc from '../../../components/ProjectDesc.vue'
import ClickImg from '../../../components/ClickImg.vue'

import Content from "../components/Content.vue"

defineProps<{ 
    mongo?: boolean
}>()

const authAndProfile = [
    "MemoryDB, RDS",
    "Redis, MySQL",
    "Golang",
]
</script>

<template>
        <Content :mongo="mongo" linkId="/distArchi">
            <template v-slot:text>
                <ProjectDesc 
                heading="Distributed Service Architecture"
                linkId="/distributedArchitecture"
                >
                    <p>
                        I wanted to create a cloud based architecture that would isolate sesitive data into its own database. I created a service based architecture that made use of a mediator to handle communication between the client and each database.
                    </p>
                    <br />
                    <ul>
                        <li v-for="point in authAndProfile">
                            {{ point }}
                        </li>
                    </ul>
                    <br />
                </ProjectDesc>
            </template>
            <template v-slot:image>
                <div class="duo_image">
                    <ClickImg class="clickImg left_top_img" path="serviceArchitecture/flow.png" />
                    <ClickImg class="clickImg right_low_img" path="serviceArchitecture/sequence.png" />
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
