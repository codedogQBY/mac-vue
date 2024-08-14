<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import WindowHeader from './WindowHeader.vue'
import WindowContent from './WindowContent.vue'
import { useAppsStore } from '@/stores/apps'

const appsStore = useAppsStore()
const { apps } = storeToRefs(appsStore)

const { closeApp, showApp, hideApp, isShowApp, isActiveApp, handleActiveApp,updateAppPosition } = appsStore

const app = computed(() => apps.value.find((app) => app.appID === appID))

const props = defineProps({
  appID: {
    type: String,
    required: true
  },
})

const { appID } = props

const WindowElement = ref<HTMLElement | null>(null)
const HeaderElement = ref<HTMLElement | null>(null)

// 宽高
const windowWidth = ref(app.value?.width ?? 800)
const windowHeight = ref(app.value?.height ?? 600)

// 顶部栏的高度
const topBarHeight = 1.4 * 16;

// 是否处于缩放状态
const isResizing = ref(false)
// 是否处于拖动状态
const isDragging = ref(false)
// 是否处于最大化状态
const isMaximized = ref(false)
// 窗口的初始位置
const windowTop = ref(app.value?.top ?? topBarHeight)
const windowLeft = ref(app.value?.left ?? 0)

// 节流函数
function throttle(fn: Function, delay: number) {
  let timer: number | null = null
  return function (...args: any[]) {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

const resizeWindow = (e: MouseEvent) => {
  if(app.value?.disableResize) return

  // 不是激活状态的app不允许缩放
  if (!isActiveApp(appID)) return

  // 鼠标移动到窗口边缘时，改变鼠标样式
  const windowEl = WindowElement.value
  if (!windowEl) return
  const { left, top, width, height } = windowEl.getBoundingClientRect()
  const { clientX, clientY } = e
  const { offsetWidth, offsetHeight } = windowEl
  const isLeft = clientX - left < 10
  const isRight = left + width - clientX < 10
  // 防止顶部拖拽空间太小
  const isTop = clientY - top < 5
  const isBottom = top + height - clientY < 10
  const isTopLeft = isTop && isLeft
  const isTopRight = isTop && isRight
  const isBottomLeft = isBottom && isLeft
  const isBottomRight = isBottom && isRight
  // 八个方向的鼠标样式
  const cursorStyle =
    isTopLeft || isBottomRight
      ? 'nwse-resize'
      : isTopRight || isBottomLeft
      ? 'nesw-resize'
      : isTop || isBottom
      ? 'ns-resize'
      : isLeft || isRight
      ? 'ew-resize'
      : 'default'
  windowEl.style.cursor = cursorStyle

  // 如果不是鼠标左键按下，不允许缩放
  if (e.buttons !== 1) {
    isResizing.value = false
    return
  }

  // 如果处于拖动状态，不允许缩放
  if (isDragging.value) return

  // 标记是否处于缩放状态
  isResizing.value = true
  windowEl.style.userSelect = 'none'

  const startX = e.clientX
  const startY = e.clientY
  const startWidth = offsetWidth
  const startHeight = offsetHeight

  const setWindowStyle = <
    T extends {
      newWidth?: number
      newHeight?: number
      newTop?: number
      newLeft?: number
    }
  >({
    newWidth,
    newHeight,
    newTop,
    newLeft
  }: T) => {
    // 禁止窗口缩小到小于最小宽高
    windowEl.style.width =  `${newWidth / 16}rem`
    windowEl.style.height = `${newHeight / 16}rem`
    windowEl.style.left = `${newLeft}px`
    windowEl.style.top = `${newTop}px`
    updateAppPosition(appID, newTop,newLeft )
    windowTop.value = newTop ?? windowTop.value
    windowLeft.value = newLeft ?? windowLeft.value
    windowHeight.value = newHeight ?? windowHeight.value
    windowWidth.value = newWidth ?? windowWidth.value
  }

  const onMouseMove = throttle((e: MouseEvent) => {
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    if (isTop) {
      setWindowStyle({ newHeight: startHeight - deltaY, newTop: top + deltaY })
    } else if (isBottom) {
      setWindowStyle({ newHeight: startHeight + deltaY })
    }
    if (isLeft) {
      setWindowStyle({ newWidth: startWidth - deltaX, newLeft: left + deltaX })
    } else if (isRight) {
      setWindowStyle({ newWidth: startWidth + deltaX })
    } else if (isTopLeft) {
      setWindowStyle({
        newWidth: startWidth - deltaX,
        newHeight: startHeight - deltaY,
        newLeft: left + deltaX,
        newTop: top + deltaY
      })
    } else if (isTopRight) {
      setWindowStyle({
        newWidth: startWidth + deltaX,
        newHeight: startHeight - deltaY,
        newTop: top + deltaY
      })
    } else if (isBottomLeft) {
      setWindowStyle({
        newWidth: startWidth - deltaX,
        newHeight: startHeight + deltaY,
        newLeft: left + deltaX
      })
    } else if (isBottomRight) {
      setWindowStyle({ newWidth: startWidth + deltaX, newHeight: startHeight + deltaY })
    }
  }, 0)

  const onMouseUp = () => {
    isResizing.value = false
    windowEl.style.userSelect = 'auto'
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// header部分可以拖动
const dragHeader = (e: MouseEvent) => {

  // 检查是否是激活状态的app
  if (!isActiveApp(appID)) return;

  // 鼠标不是默认状态时，不允许拖动
  if (WindowElement.value?.style.cursor !== 'default') return;

  if (isResizing.value) return;

  const windowEl = WindowElement.value;
  if (!windowEl) return;

  // 检查是否按下的是鼠标左键
  if (e.buttons !== 1) return;

  // 设置拖拽状态
  isDragging.value = true;
  windowEl.style.userSelect = 'none';

  const { left, top } = windowEl.getBoundingClientRect();
  const startX = e.clientX;
  const startY = e.clientY;

  const onMouseMove = throttle((e: MouseEvent) => {
    // 计算鼠标移动的距离
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // 更新窗口的位置
    windowEl.style.top = `${top + deltaY}px`;
    windowEl.style.left = `${left + deltaX}px`;

    // 更新应用的位置信息
    updateAppPosition(appID, top + deltaY, left + deltaX);
    windowTop.value = top + deltaY;
    windowLeft.value = left + deltaX;
  }, 16); // 使用节流函数来限制mousemove事件的触发频率

  const onMouseUp = () => {
    // 重置拖拽状态
    isDragging.value = false;
    windowEl.style.userSelect = 'auto';

    // 移除事件监听器
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // 添加事件监听器
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

onMounted(() => {
  WindowElement.value = document.getElementById(appID)
  if (WindowElement.value) {
    WindowElement.value.addEventListener('mousemove', resizeWindow)
  }

  HeaderElement.value = document.getElementById(`header-${appID}`)
  if (HeaderElement.value) {
    HeaderElement.value.addEventListener('mousedown', dragHeader)
  }
})

onUnmounted(() => {
  if (WindowElement.value) {
    WindowElement.value.removeEventListener('mousemove', resizeWindow)
  }
  if (HeaderElement.value) {
    HeaderElement.value.removeEventListener('mousedown', dragHeader)
  }
})


const closeWindow = () => {
  closeApp(appID)
}

const minimizeWindow = () => {
  if (isShowApp(appID)) {
    hideApp(appID)
  } else {
    // 打开到原来的位置
    const windowEl = WindowElement.value
    if (windowEl) {
      const { top, left } = app.value!
      windowEl.style.top = `${top}px`
      windowEl.style.left = `${left}px`
    }
    showApp(appID)
  }
}

const maximizeWindow = () => {
  if(app.value?.disableResize) return

  const windowEl = WindowElement.value
  if (!windowEl) return
  if (isMaximized.value) {
    windowEl.style.width = `${windowWidth.value / 16}rem`
    windowEl.style.height = `${windowHeight.value / 16}rem`
    windowEl.style.top = `${windowTop.value}px`
    windowEl.style.left = `${windowLeft.value}px`
  } else {
    windowEl.style.width = '100%'
    windowEl.style.height = '100%'
    windowEl.style.top = '0'
    windowEl.style.left = '0'
  }
  isMaximized.value = !isMaximized.value
}
</script>

<template>
  <div
      class="window"
      :id="appID"
      :style="{
      width: `${windowWidth / 16}rem`,
      height: `${windowHeight / 16}rem`,
      zIndex: app?.zIndex,
      top: `${windowTop}px`,
      left: `${windowLeft}px`
    }"
      v-show="isShowApp(appID)"
      @click="() => handleActiveApp(appID)"
  >
    <div class="window-header" :id="`header-${appID}`">
      <WindowHeader @close="closeWindow" @minimize="minimizeWindow" @maximize="maximizeWindow">
        <slot name="header"></slot>
      </WindowHeader>
    </div>
    <div class="window-content" :id="`content-${appID}`">
      <WindowContent>
        <slot></slot>
      </WindowContent>
    </div>
  </div>
</template>

<style lang="less" scoped>
.window {
  position: absolute;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.window-content {
  height: calc(100% - 2.8rem); /* Header height is subtracted */
  overflow-y: auto; /* Show scrollbar only when content overflows */
  box-sizing: border-box;
}

/* Hide scrollbar when content does not overflow */
.window-content::-webkit-scrollbar {
  width: 0; /* Hide scrollbar by default */
}

.window-content:has(:nth-child(n))::-webkit-scrollbar {
  width: 8px; /* Show scrollbar when there are children */
}

.window-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
