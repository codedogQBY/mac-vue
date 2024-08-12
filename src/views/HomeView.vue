<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Dock from '@/components/Dock/Dock.vue'
import TopBar from '@/components/TopBar/TopBar.vue'
import LaunchPad from '@/components/LaunchPad/LaunchPad.vue'
import { useAppsStore } from '@/stores/apps'
import { computed, markRaw } from 'vue'

const appsStore = useAppsStore()
const { resetActiveApp } = appsStore
const { isOpenLauncher, openedApps, menuCommand } = storeToRefs(appsStore)
const command = computed(() => menuCommand.value)

// 点击空白处，取消激活状态
document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.home-container')) {
    resetActiveApp()
  }
})
</script>

<template>
  <!--  背景图片，铺满屏幕-->
  <div class="home-container">
    <!--    顶部菜单栏-->
    <topBar></topBar>
    <!--  展示所有打开的app-->
    <div v-for="app in openedApps" :key="app.appID">
      <component :menuCommand="command" :is="markRaw(app.component)" />
    </div>

    <!--  底部dock-->
    <Dock />
    <!--  启动器-->
    <LaunchPad v-if="isOpenLauncher" />
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
