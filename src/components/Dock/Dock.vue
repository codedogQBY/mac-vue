<script lang="ts" setup>
import DockItem from './DockItem.vue'
import {ref, onMounted, onUnmounted} from 'vue'
import {interpolate} from 'popmotion'
// 鼠标悬停时的X坐标
const mouseX = ref(0)
// 鼠标移动事件
const onMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
}
onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
const dockItems = [
  {appID: 'menu', title: '启动台'},
  {appID: 'read', title: '文章'},
  {appID: 'file', title: '归档'},
  {appID: 'friends', title: '友链'},
  {appID: 'wallpapers', title: '壁纸'},
  {appID: 'setting', title: '设置'},
  {appID: 'music', title: '音乐'},
  {appID: 'message', title: '留言'},
  {appID: 'mail', title: '联系作者'},
  {appID: 'github', title: '项目源码'},
]
</script>

<template>
  <div class="dock-container">
    <div class="dock-bar">
      <DockItem
          v-for="item in dockItems"
          :key="item.appID"
          :appID="item.appID"
          :title="item.title"
      />
    </div>
  </div>
</template>

<style lang="less">
.dock-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5.2rem;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .dock-bar {
    background-color: hsla(var(--system-color-light-hsl), 0.4);
    box-shadow: inset 0 0 0 0.2px hsla(var(--system-color-grey-100-hsl), 0.7),
    0 0 0 0.2px hsla(var(--system-color-grey-900-hsl), 0.7), #0000004d 2px 5px 19px 7px;
    position: relative;
    padding: 0.3rem;
    border-radius: 1.2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: transform 0.3s ease;
  }
}
</style>
