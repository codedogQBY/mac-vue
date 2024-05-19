<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
const getTime = () => {
  // 周末映射
  const weekMap = ['日', '一', '二', '三', '四', '五', '六']
  // 获取当前时间
  const now = dayjs()
  // 获取月日
  const month = now.month() + 1
  const date = now.date()
  // 获取星期
  const week = weekMap[now.day()]
  // 获取时分秒
  const hour = now.hour() < 10 ? `0${now.hour()}` : now.hour()
  const minute = now.minute() < 10 ? `0${now.minute()}` : now.minute()
  const second = now.second() < 10 ? `0${now.second()}` : now.second()
  // 格式化时间
  return `${month}月${date}日 周${week} ${hour}:${minute}:${second}`
}

const rightTime = ref(getTime())
const updateTime = () => {
  if (rightTime.value !== getTime()) {
    rightTime.value = getTime()
  }
}

onMounted(() => {
  // 每秒更新一次时间
  const timerId = setInterval(updateTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(timerId)
  })
})
</script>

<template>
  <div class="right-time">
    <span>{{ rightTime }}</span>
  </div>
</template>

<style lang="less" scoped>
.right-time {
  color: hsla(var(--system-color-light), 0.3);
  font-size: 0.9rem;
}
</style>
