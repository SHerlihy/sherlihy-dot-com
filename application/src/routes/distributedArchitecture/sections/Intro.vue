<script setup lang="ts">
    import Introduction from "../../../components/Introduction.vue"
</script>

<template>
    <Introduction>
        <template #image>
            <div>
                <img src="/serviceArchitecture/intro/robo3.png" class="queue_up3"/>
                <img src="/serviceArchitecture/intro/robo2.png" class="queue_up2"/>
                <img src="/serviceArchitecture/intro/robo1.png" class="queue_up1"/>
                <img src="/serviceArchitecture/intro/boop3.png" class="talk3"/>
                <img src="/serviceArchitecture/intro/boop2.png" class="talk2" />
                <img src="/serviceArchitecture/intro/notAToaster.png" class="talk1"/>
                <img src="/serviceArchitecture/intro/queueBarrier.png" />
            </div>
        </template>
        <template #text>
            <p >
                The concept of managing data can start as a simple idea, however, when considering security and compliance management becomes complex and complex solutions are required.
            </p>
        </template>
    </Introduction>
</template>
<style scoped>
div {
    position: relative;
    height: 450px;
    width: 450px;
}

img {
    position: absolute;
}

.queue_up3 {
    animation: queue-up 3000ms;
}

.queue_up2 {
    animation: queue-up 800ms;
}

.queue_up1 {
    animation: queue-up 500ms;
}

.talk3 {
    animation: show-text 3000ms;
}

.talk2 {
    animation: show-text 3300ms;
}

.talk1 {
    animation: show-text 3800ms;
}

@keyframes queue-up {
    0% {
        left: 100px;
        top: -100px;
        scale: 0.5;
    }

    100% {
        left: 0px;
        top: 0px;
        scale: 1;
    }
}

@keyframes show-text {
    0% {
        visibility: hidden;
    }

    99% {
        visibility: hidden;
    }

    100% {
        visibility: visible;
    }
}
</style>
