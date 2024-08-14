import { defineStore } from 'pinia'
import { ref } from 'vue'
import { wallpapersConfig } from '@/configs/wallpaper.config'

export const useWallpaperStore = defineStore('wallpapers', () => {
  const wallpapers = ref(wallpapersConfig)
  return {
    wallpapers
  }
})
