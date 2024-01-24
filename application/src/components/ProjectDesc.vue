<script setup lang="ts">
import HLink from "./HLink.vue"

defineProps<{
    heading: string
    linkId: string
}>()

</script>

<template>
        <div class="full_width">
        <HLink :linkId='linkId' >
            {{heading}}
        </HLink>
        <br/>
        <article>
            <slot></slot>
        </article>
        </div>
</template>

<style scoped>
div {
    width: 100%;
}
</style>
