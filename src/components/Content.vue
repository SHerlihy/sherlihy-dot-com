<script setup lang="ts">

defineProps<{ heading: string, content: string[]}>()

</script>

<template>
    <section>
        <div>
        <h2>
                {{heading}}
        </h2>
        <article>
                <ul>
                <li v-for="point in content">
                    {{point}}
                </li>
                </ul>
        </article>
        </div>
        <slot></slot>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: row;

    justify-content: space-evenly;
}
</style>
