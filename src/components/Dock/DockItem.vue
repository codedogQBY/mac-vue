<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useAppsStore,App } from '@/stores/apps'
import {storeToRefs} from "pinia";

const appsStore = useAppsStore()
const { openedApps, openApp, openLauncher,closeLauncher,hideAllApps } = appsStore
const { isOpenLauncher } = storeToRefs(appsStore)
const props = defineProps<{
  appID: string
  title: string
  app:App
}>()

const { appID, title,app } = props
const iconSrc = `/app-icons/${appID}.png`

// 对应的app是否已经打开
const isOpened = computed(() => openedApps.some((app) => app.appID === appID))
const handleClick = () => {
  if(app.link){
    window.open(app.link, '_blank')
  }else if(appID === 'launcher'){
    if (isOpenLauncher.value) {
      closeLauncher()
    } else {
      openLauncher()
      hideAllApps()
    }
  }
  else{
    openApp(appID)
  }
}
</script>

<template>
  <div class="dock-item">
    <button class="dock-button">
      <p class="dock-title">
        {{ title }}
      </p>
      <img :src="iconSrc" alt="app icon" @click="handleClick" />
    </button>
    <div v-if="isOpened" class="dot"></div>
  </div>
</template>

<style lang="less">
.dock-item {
  position: relative;
  cursor: pointer;
  .dock-button {
    border-radius: 1.2rem;
    transition: transform 0.2s ease;
    padding: 0.1rem;
    margin: 0.4rem;
    width: 3rem;
    height: 3rem;

    .dock-title {
      display: none;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &:hover {
      transform: scale(1.5) translateY(-1rem);

      .dock-title {
        display: block;
        position: absolute;
        top: -1.6rem;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: hsla(var(--system-color-light-hsl), 0.4);
        color: white;
        padding: 0.2rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 0.8rem;
        white-space: nowrap;

        &::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 0.4rem solid transparent;
          border-top-color: hsla(var(--system-color-light-hsl), 0.4);
        }
      }
    }
  }
  .dot {
    // 正下方的小黑点
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    width: 0.2rem;
    height: 0.2rem;
    background-color: black;
    border-radius: 50%;
  }
}
</style>
