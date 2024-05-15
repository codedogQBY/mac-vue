<script lang="ts" setup>
import DockItem from './DockItem.vue'
import {ref, onMounted, onUnmounted} from 'vue'

const DockElement = ref<HTMLElement | null>(null)

// 加载时默认显示5s,5s后向下隐藏
let timer: number | null = null


onMounted(() => {
  DockElement.value = document.getElementById('dock-container')
  const dock = DockElement.value
  if (!dock) return
  dock.style.transform = 'translateY(0)'
  const hideDock = () => {
    dock.style.transform = 'translateY(100%)'
    timer = null
  }

  timer = setTimeout(hideDock, 3000)

  dock.addEventListener('mouseenter', () => {
    if (timer) {
      clearTimeout(timer)
      dock.style.transform = 'translateY(0)'
    }
  })

  dock.addEventListener('mouseleave', () => {
    timer = setTimeout(hideDock, 100)
  })

  // 鼠标移动到浏览器窗口底部有一个dock的高度时，dock显示
  window.addEventListener('mousemove', (e: MouseEvent) => {
    // 如果鼠标按住左键，dock不显示
    if (e.buttons === 1) return
    if (timer) return
    const {clientY} = e
    const {innerHeight} = window
    if (innerHeight - clientY < 100) {
      dock.style.transform = 'translateY(0)'
    } else {
      dock.style.transform = 'translateY(100%)'
    }
  })
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
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
  <div class="dock-container" id="dock-container">
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
  transition: transform 0.5s ease;
  z-index: 99999;

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
