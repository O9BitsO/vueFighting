<script setup lang="ts">
</script>
<template>
    <div style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; display: flex; flex-direction: column; align-items: center; overflow: auto;">
        <header class="bg-blue-300 border m-3 p-3" style="width: 90%; height: 10%; top: 0; left: 0;">
            <slot name="header"></slot>
        </header>
        <div style="display: flex; width: 90%; height: 85%;" class="bg-red-300 border m-3 p-3">
            <div style="width: 10%; height: 100%; display: flex; flex-direction: column; align-items: center;" class="bg-slate-300 container">
                <slot name="navBar"></slot>
            </div>
            <slot name="content" class="bg-indigo-300"></slot>
        </div>
    </div>
</template>