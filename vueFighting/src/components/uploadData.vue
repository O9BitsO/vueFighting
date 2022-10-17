<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useUserInfoStore } from '../stores/userInfo';
const userInfoStore = useUserInfoStore();
const userInfo = ref(userInfoStore.getUserInfo);
onMounted(()=>{
    
});
onUnmounted(() => {
    
})
</script>
<template>
</template>
<style scoped>
</style>
