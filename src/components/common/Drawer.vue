<template>
  <slot></slot>
  <div class="drawer" id="drawer" :class="{ right: isRight, open: drawerVisible }">
    <div class="drawer-content" :style="{ width: contentWidth }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, onMounted, onUnmounted, ref, watchEffect, nextTick } from 'vue'

const drawerVisible = defineModel('visible')
const contentWidth = ref('auto')
const isRight = ref(false)

// 点击非抽屉区域关闭抽屉
const closeDrawer = (e: MouseEvent) => {
  if (e.target === document.getElementById('drawer')) {
    drawerVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDrawer)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDrawer)
})

// 监听内容宽度的变化
watchEffect(async () => {
  await nextTick()
  contentWidth.value = isRight.value ? 'auto' : `${window.getComputedStyle(document.getElementById('drawer-content')).width}`
})
</script>

<style lang="less" scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .drawer-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateX(100%);
    z-index: 1000;
    margin: 0 auto;
    overflow-y: auto;

    &.right {
      left: auto;
      right: 0;
      transform: translateX(-100%);
    }
  }

  &.open {
    .drawer-content {
      opacity: 1;
      transform: translateX(0%);
    }
  }
}
</style>
