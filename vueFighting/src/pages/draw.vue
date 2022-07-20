<script setup lang="ts">
import Proto from "../components/prototype.vue";
import drawZone from "@/components/drawZone.vue";
import actionMenu from "@/components/actionMenu.vue";
import colorPicker from "@/components/colorPicker.vue";
import banner from "@/components/banner.vue";
import { onMounted, ref, watch, computed } from 'vue';

const drawingColor = ref('black');

function changeColor(color: string) {
    drawingColor.value = color;
}
</script>
<template>
    <div>
        <Proto>
            <template v-slot:header>
                <banner></banner>
            </template>
            <template v-slot:navBar>
                <actionMenu :color="drawingColor" @changeColor="changeColor"></actionMenu>
                <colorPicker @changeColor="changeColor" :baseColor="drawingColor"></colorPicker>
            </template>
            <template v-slot:content>
                <drawZone :color="drawingColor"></drawZone>
            </template>
        </Proto>
    </div>
</template>
<style>
</style>