<script setup lang="ts">
import HLink from "../../../components/HLink.vue"
import {RouterLink} from "vue-router"
</script>
<template>
    <section>
        <HLink linkId='/sherlihyDotCom'>
            SHerlihy.com
        </HLink>
        <br class="min_br"/>
        <p>
            The technical purpose of this site started as an architeture and CI/CD pipeline for simple websites. Several iterations have been built upon to create the current architecture as my personal knowledge has expanded. There are also some non-technical architecture descisions/features that I believe to be important and say alot about how I think about software engineering.
        </p>
        <br/>
        <RouterLink to="/shdotcom">Learn More...</RouterLink>
        <br/>
    </section>
</template>

<style scoped>
@media screen and (max-width: 1200px) {
section {
    flex-direction: column;
}
}
</style>
