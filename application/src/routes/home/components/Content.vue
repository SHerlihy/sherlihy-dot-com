<script setup lang="ts">
defineProps<{ 
    linkId: string
    mongo?: boolean
}>()
</script>

<template>
    <section>
        <div class="content">
    <template v-if="mongo">
            <slot name="right"></slot>
            <slot name="left"></slot>
    </template>
    <template v-else>
            <slot name="left"></slot>
            <slot name="right"></slot>
    </template>
        </div>
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
}

</style>
