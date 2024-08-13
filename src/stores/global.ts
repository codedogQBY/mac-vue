import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  // 从localStorage中获取壁纸url
  const localWallpaperUrl = localStorage.getItem('wallpaperUrl') || '/wallpapers/2.jpg'

  // 壁纸url
  const wallpaperUrl = ref(localWallpaperUrl)

  // 切换壁纸
  function changeWallpaper(url: string) {
    wallpaperUrl.value = url
    // 存到localStorage
    localStorage.setItem('wallpaperUrl', url)
  }

  return {
    wallpaperUrl,
    changeWallpaper
  }
})
