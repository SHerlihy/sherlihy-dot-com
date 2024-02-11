<script setup lang="ts">
import I2group from './sections/I2group.vue'
import DistArchi from './sections/DistArchi.vue'
import VelmaMode from './sections/VelmaMode.vue'
import Introduction from './sections/Introduction.vue'
import SHerlihyDotCom from './sections/SHerlihyDotCom.vue'
</script>

<template>
    <main>
        <br/>
        <Introduction/>
        <br/>
        <div class="light_bg">
            <br/>
            <SHerlihyDotCom/>
            <br/>
        </div>
        <br/>
            <I2group/>
        <br />
        <br />
        <div class="light_bg">
            <br/>
                <DistArchi mongo/>
            <br/>
        </div>
        <br />
            <VelmaMode/>
        <br/>

    </main>
</template>

