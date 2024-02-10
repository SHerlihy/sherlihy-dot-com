<script setup lang="ts">
defineProps<{ 
    linkId: string
    mongo?: boolean
}>()
</script>

<template>
    <section>
            <template v-if="mongo === true">
                <div class="content">
                        <slot name="left"></slot>
                        <slot name="right"></slot>
                </div>
            </template>
            <template v-else>
                <div class="content sml_rev">
                        <slot name="right"></slot>
                        <slot name="left"></slot>
                </div>
            </template>
            <br/>
            <RouterLink :to="linkId">Learn More...</RouterLink>
    </section>
</template>

<style scoped>
.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3vw;
}

@media screen and (max-width: 1200px) {
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sml_rev {
        flex-flow: column-reverse;
    }
}

</style>
