<script setup lang="ts">
import Proto from "../components/prototype.vue";
import Menu from "../components/RouteMenu.vue";
import Banner from "../components/banner.vue"
</script>
<template>
    <div>
        <Proto>
            <template v-slot:header>
                <div>
                    <Banner></Banner>
                </div>
            </template>
            <template v-slot:navBar>
                <div>
                    <Menu></Menu>
                </div>
            </template>
            <template v-slot:content>
                <div>
                    <router-view name="second"></router-view>
                </div>
            </template>
        </Proto>
    </div>
</template>