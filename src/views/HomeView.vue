<script setup lang="ts">
import Dock from '@/components/Dock/Dock.vue';
import Window from '@/components/Window/Window.vue';
</script>


<template>
  <!--  背景图片，铺满屏幕-->
  <div class="home-container">
    <!--  窗口组件-->
    <Window appID="file" width="800" height="600"/>
    <Dock/>
  </div>
</template>

<style lang="less">
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/wallpapers/1.png');
  background-size: cover;
  background-position: center;
}
</style>
