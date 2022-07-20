<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
let canvas: HTMLCanvasElement | null;
let ColorCtx: CanvasRenderingContext2D | null;
const emit = defineEmits(['changeColor']);
const props = defineProps(['baseColor']);

function selectColor(event: MouseEvent) {
    if (!canvas) return;
    let x = event.clientX - canvas.getBoundingClientRect().left;  // Get X coordinate
    let y = event.clientY - canvas.getBoundingClientRect().top;  // Get Y coordinate
    let pixel = ColorCtx?.getImageData(x, y, 1, 1)['data'];   // Read pixel Color
    if (!pixel) return;
    let rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // console.log(rgb);
    document.body.style.background = rgb;    // Set this color to body of the document
    // updateSelectedColor(rgb);
    emit('changeColor', rgb);
}

function updateColor() {
    if (!canvas) return;
    if (!ColorCtx) return;
    ColorCtx.clearRect(0, 0, canvas.width, canvas.height)
    var color = props.baseColor || 'rgba(0,0,255,1)';
    let gradientH = ColorCtx.createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
    gradientH.addColorStop(0, '#fff');
    gradientH.addColorStop(1, color);
    ColorCtx.fillStyle = gradientH;
    ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);
    let gradientV = ColorCtx.createLinearGradient(0, 0, 0, 300);
    gradientV.addColorStop(0, 'rgba(0,0,0,0)');
    gradientV.addColorStop(1, '#000');
    ColorCtx.fillStyle = gradientV;
    ColorCtx.fillRect(0, 0, ColorCtx.canvas.width,
        ColorCtx.canvas.height);
}

watch(props, async () => {
    updateColor();
})

onMounted(() => {
    canvas = <HTMLCanvasElement>document.getElementById('colorPicker');
    if (!canvas) return;
    ColorCtx = canvas.getContext('2d');
    if (!ColorCtx) return;
    canvas.width = 100;
    canvas.height = 100;
    updateColor();

    canvas.addEventListener('click', selectColor);
})
</script>
<template>
    <div style="display: flex; flex-direction: column;">
        <canvas id="colorPicker"></canvas>
    </div>
</template>
<style>
</style>