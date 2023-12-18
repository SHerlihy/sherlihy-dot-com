<template>
    <header class="header">
        <b class="head_text left_text">SHerlihy</b>
        <span/>
        <div class="right_flex">
            <p class="head_text">steven_herlihy@yahoo.com</p>
            <p class="head_text">|</p>
            <p class="head_text">+44 73544 30588</p>
        </div>
    </header>
</template>

<style scoped>
.header {
    top: 0;
    position: sticky;

    background-color: rgba(60, 30, 60);

    display: grid;
    grid-template-columns: auto auto auto;

    justify-content: space-between;
    align-content: center;
}

.right_flex {
    display: flex;
    flex-direction: row;

    height: 100%;

    align-items: center;
    align-content: center;
}

.left_text {
    font-size: 1.5rem;
}

.head_text {
    padding: 0.5rem;
}
</style>
