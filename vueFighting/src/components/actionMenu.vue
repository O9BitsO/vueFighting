<script setup lang="ts">
const props = defineProps(['color']);
let listColor = [
    'black',
    'red',
    'blue',
    'yellow',
    'purple',
    'green',
    'white',
    'gray',
    'rgb(136 19 55)',
    'rgb(253 164 175)',
    'rgb(134 25 143)',
    'rgb(94 234 212)',
    'rgb(190 242 100)',
    'rgb(113 63 18)',
]
function bgColor(color: string) {
    return 'background-color: ' + color + ';';
}
</script>
<template>
    <div style="overflow-y: scroll;" class="container colorBar">
        <div v-for="color in listColor" :key="color">
            <button class="w-9 h-9 m-3 p-3 border" :style="[bgColor(color)]"
                :class="[{ 'skew-y-12 rotate-3 scale-150 ml-9 mt-20 mb-20 mr-3 outline-double outline-3 outline-offset-2': props.color === color }]"
                @click="$emit('changeColor', color)"></button>
        </div>
    </div>
</template>
<style>
.colorBar::-webkit-scrollbar{
    width:0;
    background-color:transparent;
}
</style>