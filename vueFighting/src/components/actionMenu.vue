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
]
function bgColor(color: string) {
    return 'background-color: ' + color + ';';
}
</script>
<template>
    <div>
        <div v-for="color in listColor" :key="color">
            <button class="w-9 h-9 m-3 p-3 border" :style="[bgColor(color)]" :class="[{'skew-y-12 rotate-3 scale-150 ml-9 mt-20 mb-20 mr-3 outline-double outline-3 outline-offset-2' : props.color === color}]" @click="$emit('changeColor', color)"></button>
        </div>
    </div>
</template>
<style>
</style>