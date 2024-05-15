<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Dock from '@/components/Dock/Dock.vue'
import { useAppsStore } from '@/stores/apps'

const appsStore = useAppsStore()
const { openedApps } = storeToRefs(appsStore)
</script>

<template>
  <!--  背景图片，铺满屏幕-->
  <div class="home-container">
    <!--  展示所有打开的app-->
    <div v-for="app in openedApps" :key="app.appID">
      <component :is="app.component" />
    </div>

    <!--  底部dock-->
    <Dock />
  </div>
</template>

<style lang="less">
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/wallpapers/2.jpg');
  background-size: cover;
  background-position: center;
}
</style>
