<script setup lang="ts">
import HLink from "../components/HLink.vue"
</script>
<template>
    <section>
        <HLink linkId='sherlihyDotCom'>
            SHerlihy.com
        </HLink>
        <br class="min_br"/>
        <p>
            The functional purpose of this website has been described above, however, I have used this website as a vehicle for serveral technical purposes. Primarily, I wanted to create a CI/CD pipeline and Cloud provisioned infrastructure that could be used as a template for deploying other websites. I also wanted to refresh my raw CSS skills and basic Vue.js capabilities.
        </p>
        <br/>
        <p>
            The CI/CD pripline went through several iterations. Originally I used a load balancer for a terminationg HTTPS connection as it allowed my to use an AWS issued certificate. In short time I saw unexpected costs associated with the deployment and narrowed it down to excessive usage of NAT gateways. I removed the NAT gateways and provisioned my servers in public subnets but eventaully decided I would use S3 instead as the content is static and rarely accessed.
        </p>
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
