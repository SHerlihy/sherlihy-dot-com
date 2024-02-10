<script setup lang="ts">
</script>

<template>
    <section>
        <div class="leading">
            <slot name="image"></slot>
        </div>
        <article class="grid_auto_center">
            <div class="grid_center_content">
                <slot name="text"></slot>
            </div>
            <br/>
        </article>
    </section>
</template>

<style scoped>
section {
    height: 65vh;
    display: flex;
    flex-direction: row;

    align-items: center;
}

article {
    overflow: hidden;
}

.leading {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 350px;
    min-width: 350px;
    max-height: 350px;
    max-width: 350px;

    margin-right: 1rem;
    margin-bottom: 0;
}

.grid_auto_center {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    grid-template-rows: 1fr auto 1fr;
}

.grid_center_content {
    grid-column: 2;
    grid-row: 2;
}

@media screen and (max-width: 1200px) {
    section {
        flex-direction: column;
        justify-content: center;
    }

    .leading {
        margin-right: 0;
        margin-bottom: 1rem;
    }
}
</style>
