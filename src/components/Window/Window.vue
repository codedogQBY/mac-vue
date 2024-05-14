<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import WindowHeader from './WindowHeader.vue'
import WindowContent from './WindowContent.vue'

const props = defineProps({
  appID: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 600
  }
})

const { appID, width, height } = props

const WindowElement = ref<HTMLElement | null>(null)
const HeaderElement = ref<HTMLElement | null>(null)

// 是否处于缩放状态
const isResizing = ref(false)
// 是否处于拖动状态
const isDragging = ref(false)

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
  // 鼠标移动到窗口边缘时，改变鼠标样式
  const windowEl = WindowElement.value
  if (!windowEl) return
  const { left, top, width, height } = windowEl.getBoundingClientRect()
  const { clientX, clientY } = e
  const { offsetWidth, offsetHeight } = windowEl
  const isLeft = clientX - left < 10
  const isRight = left + width - clientX < 10
  // 防止顶部拖拽空间太小
  const isTop = clientY - top < 2
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
    windowEl.style.width = `${newWidth}px`
    windowEl.style.height = `${newHeight}px`
    windowEl.style.left = `${newLeft}px`
    windowEl.style.top = `${newTop}px`
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
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// header部分可以拖动
const dragHeader = (e: MouseEvent) => {
  const windowEl = WindowElement.value
  if (!windowEl) return
  // 如果处于缩放状态，不允许拖动
  if (isResizing.value) return

  // 如果不是鼠标左键按下，不允许拖动
  if (e.buttons !== 1) return;

  // 鼠标样式如果不是默认状态，不允许拖动
  if (windowEl.style.cursor !== 'default') return

  // 标记是否处于拖动状态
  isDragging.value = true

  const { left, top } = windowEl.getBoundingClientRect()
  const startX = e.clientX
  const startY = e.clientY
  const onMouseMove = throttle((e: MouseEvent) => {
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    windowEl.style.left = `${left + deltaX}px`
    windowEl.style.top = `${top + deltaY}px`
  }, 0)
  const onMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

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
  console.log('closeWindow')
}

const minimizeWindow = () => {
  console.log('minimizeWindow')
}

const maximizeWindow = () => {
  console.log('maximizeWindow')
}
</script>

<template>
  <div class="window" :id="appID" style="z-index: 10">
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
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
