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
                        <div>
                        <slot name="text"></slot>
                        <br/>
                        <RouterLink :to="linkId">Learn More...</RouterLink>
                        <br/>
                        </div>
                        <slot name="image"></slot>
                </div>
            </template>
            <template v-else>
                <div class="content sml_rev">
                        <slot name="image"></slot>
                        <div>
                        <slot name="text"></slot>
                        <br/>
                        <RouterLink :to="linkId">Learn More...</RouterLink>
                        <br/>
                        </div>
                </div>
            </template>
            <div class="sml_link">
            <br/>
            <RouterLink :to="linkId">Learn More...</RouterLink>
            </div>
    </section>
</template>

<style scoped>
.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3vw;

    align-items: center;
}

.sml_link {
    visibility: hidden;
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

    .sml_link {
        visibility: visible;
    }
}

</style>
