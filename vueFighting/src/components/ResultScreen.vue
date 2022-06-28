<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    message: String,
    btnText: String,
});
const emit = defineEmits(['reset']);
const isDisplayed = computed(() => {
    if (props.message !== '') return 'display:flex';
    else return 'display:none';
});
</script>
<template>
    <div :style="isDisplayed">
        <div style="justify-content: center; align-items: center;display: flex; width: 100%; height: 100%;"
            >
            <div class="rounded-md bg-white p-9">
                <div class="text-6xl font-sans text-violet-600 rounded-sm bg-red-100 p-3 m-3">
                    {{ message }}
                </div>
                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                    <button class="rounded bg-slate-400 font-extrabold p-3" @click="$emit('reset')">{{ btnText
                    }}</button>
                </div>
            </div>
        </div>
    </div>
</template>