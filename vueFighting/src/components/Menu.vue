<script setup>
import HelloWorldVue from './HelloWorld.vue';
import TheWelcomeVue from './TheWelcome.vue';
import WelcomeItemVue from '../App.vue';
import { ref, computed } from 'vue';

const openMenu = ref(false);

const currentTab = ref('HelloWorldVue');
const tabs = {
    HelloWorldVue,
    TheWelcomeVue,
    WelcomeItemVue,
};

function selectMargin(i) {
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
                :class="['border-2', 'tab-button', { 'bg-red-300': currentTab === tab }, selectMargin(index)]"
                class=" p-3 mr-3 mt-3 hover:bg-red-300 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                @click="() => { currentTab = tab; openMenu = true }">{{ tab }}</button>
                <hr class="mt-3 mb-3">
            <div :style="displayMenuContent" style="justify-content: center; align-items: center;">
                <button class="rounded-full border-2 p-3 m-3 bg-red-300 transition animate-pulse hover:scale-150"
                    @click="openMenu = false">X</button>
            </div>
        </div>
        <div class="p-3 rounded border-2 ml-3 mt-3" style="width: 80%; height: 90%;"
            :style="displayMenuContent">
            <component :is="tabs[currentTab]" class="tab "></component>
        </div>
    </div>
</template>

