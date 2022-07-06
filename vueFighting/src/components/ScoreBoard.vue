<script setup lang="ts">
import { usePointStore } from '../stores/point';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Sprite from '@/classes/Sprite';

const avatar = {
    mack: {
        src: '/assets/samuraiMack/Idle.png',
        frame: 8
    },
    kenji: {
        src: '/assets/kenji/Idle.png',
        frame: 4
    }
}
let animationId = 0;
const point = usePointStore();
console.log(point.getPlayerPoint);
const frame = ref(1);
const imgSrc = ref('/assets/samuraiMack/Idle.png');
let img = new Image();
img.src = "/assets/samuraiMack/Idle.png";
let imgDimension = ref({ width: 0, height: 0 });
function switchSprite() {
    let img = new Image();
    if (imgSrc.value.indexOf('samuraiMack') > -1) {
        imgSrc.value = avatar.kenji.src;
        frame.value = avatar.kenji.frame;
    } else {
        imgSrc.value = avatar.mack.src;
        frame.value = avatar.mack.frame;
    }
    img.src = imgSrc.value;
    imgDimension.value = {
        width: img.width,
        height: img.height
    };
    window.cancelAnimationFrame(animationId);
    init();
}

function init() {
    console.log('init');
    const canvas = document.querySelector('canvas');
    const c = canvas?.getContext('2d');
    if (canvas && c) {
        canvas.width = 200;
        canvas.height = 200;
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    const player = new Sprite({
        position: {
            x: -100,
            y: -100,
        },
        imageSrc: imgSrc.value,
        scale: 2,
        framesMax: frame.value,
    });
    function animate() {
        animationId = window.requestAnimationFrame(animate);
        if (c && canvas) {
            player.update(c);
        }
    }
    animate();
}

const computePoint = computed(()=> {
    if (imgSrc.value.indexOf('samuraiMack') > -1) {
       return point.getPlayerPoint;
    } else {
        return point.getEnemyPoint;
    }
})

onMounted(() => {
    init();
})

onUnmounted(() => {
    console.log('unmounted');
    window.cancelAnimationFrame(animationId);
})

</script>
<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <canvas class="border border-l-rose-300 rounded-full"></canvas>
        <button @click="() => { switchSprite() }" class="bg-red-300 m-3 p-3 border-spacing-3 rounded-xl">Switch</button>
        <div style="display: flex; justify-content: center; align-items: center;">
            <span class="container m-3 p-3 bg-cyan-300 rounded">Score: {{ computePoint >= 0 ? computePoint : 0 }}</span>
        </div>
    </div>
</template>
<style>
</style>