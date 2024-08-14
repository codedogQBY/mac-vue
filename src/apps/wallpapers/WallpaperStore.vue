<!-- WallpaperStore.vue -->
<template>
  <div class="wallpaper-container">
    <!-- 当前选中壁纸 -->
    <h2 class="wallpaper-title">当前壁纸</h2>
    <div class="current-wallpaper">
      <img :src="wallpaperUrl" alt="Current Wallpaper" class="wallpaper" />
    </div>
    <!-- 壁纸列表 -->
    <h2 class="wallpaper-title">壁纸列表</h2>
    <div class="wallpapers">
      <div
          v-for="(group, key) in wallpapers"
          :key="key"
          class="wallpaper-item"
      >
        <h3 class="wallpaper-group-title">{{ group.name }}</h3>
        <div class="wallpaper-group">
          <div
              v-for="wallpaper in group.image"
              :key="wallpaper"
              class="wallpaper-thumbnail"
              :style="{ backgroundImage: `url(${wallpaper})` }"
              @click="changeWallpaper(wallpaper)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/global'
import { useWallpaperStore } from '@/stores/wallpapers'
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const wallpapersStore = useWallpaperStore()

const { changeWallpaper } = useGlobalStore()
const { wallpapers } = wallpapersStore
const { wallpaperUrl } = storeToRefs(globalStore)
</script>



<style lang="less" scoped>
.wallpaper-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
  color: #333;

  @media (max-width: 768px) {
    padding: 10px;
  }
}

.wallpaper-title {
  font-size: 1.75rem; /* 增大字体 */
  font-weight: 700; /* 更粗的字体 */
  margin-bottom: 20px;
  padding: 10px 20px; /* 调整内边距 */
  color: #fff; /* 白色字体 */
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); /* 渐变背景 */
  border-radius: 5px; /* 圆角 */
  text-align: left;
  display: inline-block; /* 使标题宽度根据内容自适应 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  max-width: fit-content; /* 确保标题不会占满整行 */
}

.current-wallpaper {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;

  .wallpaper {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
}

.wallpapers {
  width: 100%;

  .wallpaper-item {
    margin-bottom: 30px;

    .wallpaper-group-title {
      font-size: 1.5rem; /* 墑字体 */
      font-weight: 600; /* 更粗的字体 */
      margin-bottom: 15px;
      color: #fff; /* 白色字体 */
      background: linear-gradient(90deg, #ff6a00 0%, #ee0979 100%); /* 渐变背景 */
      padding: 5px 15px; /* 调整内边距 */
      border-radius: 5px; /* 圆角 */
      text-align: left;
      display: inline-block; /* 使标题宽度根据内容自适应 */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
      max-width: fit-content; /* 确保标题不会占满整行 */
    }

    .wallpaper-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      justify-content: flex-start;

      .wallpaper-thumbnail {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        border: 2px solid transparent;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
          transform: scale(1.05);
          border-color: #aaa; /* 修改悬停时的边框颜色 */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
</style>
