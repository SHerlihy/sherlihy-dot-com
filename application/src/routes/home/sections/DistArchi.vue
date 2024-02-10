<script setup lang="ts">
import Content from '../../../components/Content.vue'
import ProjectDesc from '../../../components/ProjectDesc.vue'
import ClickImg from '../../../components/ClickImg.vue'

const authAndProfile = [
    "MemoryDB, RDS",
    "Redis, MySQL",
    "Golang",
]
</script>

<template>
        <Content mongo>
            <template v-slot:right>
                <ProjectDesc 
                heading="Distributed Service Architecture"
                linkId="/distributedArchitecture"
                >
                    <p>
                        A REST based service Architecture designed to seperate sensitive data used for authorization (name, email, etc) from non-sensitive data.
                    </p>
                    <br />
                    <ul>
                        <li v-for="point in authAndProfile">
                            {{ point }}
                        </li>
                    </ul>
                </ProjectDesc>
            </template>
            <template v-slot:left>
                <div class="duo_image">
                    <ClickImg class="clickImg left_top_img" path="../../public/serviceArchitecture/flow.png" />
                    <ClickImg class="clickImg right_low_img" path="../../public/serviceArchitecture/sequence.png" />
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
