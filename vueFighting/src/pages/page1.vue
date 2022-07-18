<script setup lang="ts">
import Proto from "../components/prototype.vue";
import Menu from "../components/RouteMenu.vue";
</script>
<template>
    <div>
        <Proto>
            <template v-slot:header>
                <div>
                    <p>Random Header</p>
                </div>
            </template>
            <template v-slot:navBar>
                <div>
                    <Menu></Menu>
                </div>
            </template>
            <template v-slot:content>
                <div>
                    <router-view></router-view>
                </div>
            </template>
        </Proto>
    </div>
</template>