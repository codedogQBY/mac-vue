<template>
  <div class="launchpad" @click="handleClick">
    <!--  应用列表-->
    <div class="body">
      <div class="launchpad-app">
        <!--    一行六个，有间距排列    -->
        <template v-for="app in apps" :key="app.appID">
          <div v-if="app.appID !== 'launcher'" class="app-item">
            <img @click="clickApp(app)" :src="`/app-icons/${app.appID}.png`" alt="app icon" />
            <p>{{ app.title }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppsStore,App } from '@/stores/apps'
const appsStore = useAppsStore()
const { apps, openApp, closeLauncher } = appsStore
const clickApp = (app:App) => {
  if(app.link){
    window.open(app.link, '_blank')
  }else {
    openApp(app.appID)
    closeLauncher()
  }
}
const handleClick = (event:MouseEvent) => {
  // 点击空白处关闭启动器, 但是点击应用不关闭
  if ((event.target as HTMLElement).classList.contains('launchpad')) {
    closeLauncher()
  }
}
</script>
<style lang="less" scoped>
.launchpad {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .body {
    margin: auto;
    .launchpad-app {
      display: flex;
      flex-wrap: wrap;
      padding: 1rem;
      justify-content: flex-start;
      .app-item {
        width: calc(16.666%);
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-bottom: 2rem;
        img {
          width: 6rem;
          height: 6rem;
          border-radius: 0.5rem;
        }
        p {
          margin-top: 0.5rem;
          font-size: 1rem;
          color: white;
        }
      }
    }
  }
}
</style>
