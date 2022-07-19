<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
const mouse = ref({ x: 0, y: 0 });
let canvas: HTMLCanvasElement | null;
let c: CanvasRenderingContext2D | null;
const drawing = ref(false);
let boardPos = ref({ x: 0, y: 0 });
// const drawingColor = ref('black');
const props = defineProps(['color']);


function init() {
    canvas = document.querySelector('canvas');
    if (!canvas) return;
    c = canvas.getContext('2d');
    if (!c) return;
    canvas.width = 1024;
    canvas.height = 576;
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    let offset = canvas.getBoundingClientRect();
    boardPos.value.x = offset.left;
    boardPos.value.y = offset.top;
    document.addEventListener('mousedown', draw);
}

function draw() {
    if (!c) return;
    console.log('I am drawing!!!');
    c.fillStyle = props.color;
    c.fillRect(mouse.value.x - boardPos.value.x, mouse.value.y - boardPos.value.y, 1, 1);
}

// watch(drawing, async (isDrawing: boolean) => {
//     if (isDrawing) {
//         draw();
//     }
// })

const continueDrawing = computed(() => {
  if(drawing.value) draw();
  return;
})

onMounted(() => {
    init();
    document.onmousemove = function (e) {
        mouse.value.x = e.pageX;
        mouse.value.y = e.pageY;
        if (!canvas) return;
        let offset = canvas.getBoundingClientRect();
        boardPos.value.x = offset.left;
        boardPos.value.y = offset.top;
    };
    document.onmousedown = function () {
        drawing.value = true;
    };
    document.onmouseup = function () {
        drawing.value = false;
    };
})
</script>
<template>
    <div class="drawZone border border-cyan-300">
        <canvas id="drawBoard" class="drawBoard"></canvas>
    </div>
    <p>{{continueDrawing}}</p>
</template>
<style>
.drawZone {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.drawBoard {
    position: absolute;
}
</style>