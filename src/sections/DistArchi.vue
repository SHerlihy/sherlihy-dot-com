<script setup lang="ts">
import Content from '../components/Content.vue'
import ProjectDesc from '../components/ProjectDesc.vue'

const authAndProfile = [
    "MemoryDB, RDS",
    "Redis, MySQL",
    "Golang",
]
</script>

<template>
        <Content mongo>
            <template v-slot:right>
                <ProjectDesc heading="Distributed Service Architecture">
                    <p>
                        A REST based service Architecture designed to seperate sensitive data used for authorization (name, email, etc) from non-sensitive data.
                    </p>
                        <br/>
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
                        <br/>
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
                    <img class="left_top_img" src="../../public/serviceArchitecture/flow.png" />
                    <img class="right_low_img" src="../../public/serviceArchitecture/sequence.png" />
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

    img {
        margin-bottom: 1rem;
    }
}
</style>
