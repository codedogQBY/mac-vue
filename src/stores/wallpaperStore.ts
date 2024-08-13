import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { wallpapersConfig } from '@/configs/wallpapers'
import type { WallpaperID } from '@/configs/wallpapers'

export const useWallpaperStore = defineStore('wallpaper', () => {
  const wallpaperId = ref<WallpaperID>('default')
  const canControlTheme = ref(false)

  const currentWallpaper = computed(() => wallpapersConfig[wallpaperId.value])
  const currentWallpaperImage = computed(() => currentWallpaper.value.image)
  const currentWallpaperType = computed(() => currentWallpaper.value.type)

  const changeWallpaper = (id: WallpaperID) => {
    wallpaperId.value = id
  }

  const toggleThemeControl = (value: boolean) => {
    canControlTheme.value = value
  }

  return {
    wallpaperId,
    canControlTheme,
    currentWallpaper,
    currentWallpaperImage,
    currentWallpaperType,
    changeWallpaper,
    toggleThemeControl
  }
})
