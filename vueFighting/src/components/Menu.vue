<script setup lang="ts">
import HelloWorldVue from './HelloWorld.vue';
import TheWelcomeVue from './TheWelcome.vue';
import WelcomeItemVue from '../App.vue';
import { ref, computed } from 'vue';

const openMenu = ref(false);
const isActive = ref(false);

const currentTab: any = ref('');
const tabs: any = {
    HelloWorldVue,
    TheWelcomeVue,
    WelcomeItemVue,
};

function selectMargin(i: number | undefined) {
    return 'ml-' + i;
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
    <div style="display: flex; width: 100%; height: 100%;">
        <div style="display: flex;flex-direction: column; width: 10%;">
            <button v-for="(_, tab, index) in tabs" :key="tab"
                :class="['border-2', 'tab-button', { 'bg-red-300 skew-y-12 rotate-3 scale-150 ml-9 mt-20 mb-20 mr-3': currentTab === tab }, selectMargin(index)]"
                class=" p-3 mr-3 mt-3 hover:bg-red-300 transition transform hover:z-0 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                @click="() => { currentTab = tab; openMenu = true }">{{ tab }}</button>
            <hr class="mt-3 mb-3">
            <div :style="displayMenuContent" style="justify-content: center; align-items: center;">
                <button class="rounded-full border-2 p-3 m-3 bg-red-300 transition animate-pulse hover:scale-150"
                    @click="openMenu = false">x</button>
            </div>
        </div>

        <Transition>
            <div :class="{ active: isActive }" class="p-3 rounded border-2 ml-3 mt-3 hover:z-0 hoverSpeical container" style="display:flex; width: 80%; height: 90%;" 
                v-if="openMenu"
                @auxclick="isActive = !isActive">
                <component :is="tabs[currentTab]" class="tab" style="width : 100%"></component>
            </div>
        </Transition>
    </div>

</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 1.5s ease;
    transform: translateY(0.875rem);
    transform: rotate(3deg);
    background-color: bisque;
    transform: skewY(12deg);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    background-color: aquamarine;
}
.active {
    position: absolute;
    background-color: azure;
    margin-left: 15%;
    z-index: 0;
}
</style>