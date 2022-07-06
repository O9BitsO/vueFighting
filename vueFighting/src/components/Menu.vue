<script setup lang="ts">
import Login from './LoginScreen.vue';
import Score from './ScoreBoard.vue';
import Game from '../App.vue';
import { ref, computed } from 'vue';

const openMenu = ref(false);
const isActive = ref(false);

const currentTab: any = ref('');
const tabs: any = {
    Login,
    Score,
    Game,
};

function selectMargin(i: number | undefined) {
    return 'ml-' + 1;
}

const displayMenu = computed(() => {
    if (openMenu.value) return 'display:none';
    else return 'display:flex';
})

const displayMenuContent = computed(() => {
    if (!openMenu.value) return 'display:none';
    else return 'display:flex';
})

</script>
<template>
    <div class="the-body" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
        <div style="display: flex; width: 100%; height: 100%;" class="ml-1">
            <div style="display: flex;flex-direction: column; width: 10%;">
                <button v-for="(_, tab, index) in tabs" :key="tab"
                    :class="['border-2', 'tab-button', { 'bg-red-300 skew-y-12 rotate-3 scale-150 ml-9 mt-20 mb-20 mr-3 outline-double outline-3 outline-offset-2': currentTab === tab }, selectMargin(index)]"
                    class="bg-slate-50 p-3 mr-3 mt-3 hover:bg-red-300 transition transform hover:z-0 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                    @click="() => { currentTab = tab; openMenu = true; isActive = true; }">{{ tab }}</button>
                <hr class="mt-3 mb-3">
                <div :style="displayMenuContent" style="justify-content: center; align-items: center;">
                    <button class="rounded-full border-2 p-3 m-3 bg-red-300 transition animate-pulse hover:scale-150"
                        @click="() => { openMenu = false; isActive = false; currentTab = ''; }">x</button>
                </div>
            </div>

            <Transition name="slide-fade">
                <div :class="{ active: isActive }"
                    class="p-3 rounded border-2 ml-3 mt-3 hover:z-0 hoverSpeical container outline-double outline-3 outline-offset-2"
                    style="display:flex; width: 80%; height: 90%;" v-if="openMenu">
                    <!-- <KeepAlive> -->
                    <component :is="tabs[currentTab]" class="tab" style="width : 100%"></component>
                    <!-- </KeepAlive> -->
                </div>
            </Transition>
        </div>
    </div>
</template>

<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
    animation: spin 0.5s;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    animation: spin 0.5s reverse;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.active {
    position: absolute;
    background-color: azure;
    margin-left: 15%;
    z-index: 0;
}

.the-body {
    background:
        linear-gradient(-90deg, rgba(0, 0, 0, .05) 1px, transparent 1px),
        linear-gradient(rgba(0, 0, 0, .05) 1px, transparent 1px),
        linear-gradient(-90deg, rgba(0, 0, 0, .04) 1px, transparent 1px),
        linear-gradient(rgba(0, 0, 0, .04) 1px, transparent 1px),
        linear-gradient(transparent 3px, #f2f2f2 3px, #f2f2f2 78px, transparent 78px),
        linear-gradient(-90deg, #aaa 1px, transparent 1px),
        linear-gradient(-90deg, transparent 3px, #f2f2f2 3px, #f2f2f2 78px, transparent 78px),
        linear-gradient(#aaa 1px, transparent 1px),
        #f2f2f2;
    background-size:
        4px 4px,
        4px 4px,
        80px 80px,
        80px 80px,
        80px 80px,
        80px 80px,
        80px 80px,
        80px 80px;
}
</style>