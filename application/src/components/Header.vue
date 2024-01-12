<template>
    <header class="header">
        <b class="left_text">SHerlihy</b>
        <span/>
        <div class="right_flex">
            <p>steven_herlihy@yahoo.com</p>
            <p class="details_partition">|</p>
            <p>+44 73544 30588</p>
        </div>
    </header>
</template>

<style scoped>
.header {
    z-index: 99;
    top: 0;
    position: sticky;

    background-color: rgba(60, 30, 60);

    display: grid;
    grid-template-columns: auto auto auto;

    justify-content: space-between;
    align-content: center;

    padding: 1rem;
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

.details_partition {
    margin: 0 1rem;

}

.head_text {
    padding: 0 1rem;
}

@media screen and (max-width: 900px) {
.header {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;

        justify-items: center;
        justify-content:unset;
}

    .right_flex {
        flex-direction: column;
    }

    .details_partition {
        display: none;
    }
}
</style>
