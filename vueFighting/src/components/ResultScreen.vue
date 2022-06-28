<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    message: String
});
const emit = defineEmits(['reset']);
const isDisplayed = computed(() => {
    if (props.message !== '') return 'display:flex';
    else return 'display:none';
});
</script>
<template>
    <div :style="isDisplayed" class="rounded-md bg-white">
        <div class="text-9xl font-sans text-violet-600">
            {{ message }}
        </div>
        <button class="rounded bg-slate-400 font-extrabold" @click="$emit('reset')">Reset</button>
    </div>
</template>