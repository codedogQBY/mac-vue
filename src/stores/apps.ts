import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { allApps } from '@/configs/app.config'

export type App = {
  appID: string
  name: string
  icon: string
  component?: any
  isShow?: boolean
  zIndex?: number
  top?: number
  left?: number
  title?: string
  keepInDock?: boolean
  link?: string
  width?: number
  height?: number
  // 是否禁止缩放
  disableResize?: boolean
  // 菜单
  menus?: unknown[]
}

export const useAppsStore = defineStore('apps', () => {
  const apps = ref<App[]>(allApps)
  const openedApps = ref<App[]>([])
  const activeApp = ref<App | null>(null)
  const isOpenLauncher = ref(false)
  // 菜单指令
  const menuCommand = ref<string | number | null>(null)

  const setMenuCommand = (command: string | number | null) => {
    menuCommand.value = command
  }

  const appCount = computed(() => openedApps.value.length)

  const zIndex = ref(3)
  const handleActiveApp = (appID: string) => {
    const app = openedApps.value.find((app) => app.appID === appID)
    if (!app) return
    if (activeApp.value?.appID === appID) return
    zIndex.value++
    app.zIndex = zIndex.value
    activeApp.value = app
  }

  // 将activeApp设置为null
  const resetActiveApp = () => {
    activeApp.value = null
  }

  // 更新app的位置
  const updateAppPosition = (appID: string, top?: number, left?: number) => {
    const app = openedApps.value.find((app) => app.appID === appID)
    if (!app) return
    app.top = top || 0
    app.left = left || 0
  }

  const isActiveApp = (appID: string) => {
    return activeApp.value?.appID === appID
  }

  const closeApp = (appID: string) => {
    const index = openedApps.value.findIndex((app) => app.appID === appID)
    if (index === -1) return
    openedApps.value.splice(index, 1)
    if (activeApp.value?.appID === appID) {
      activeApp.value.zIndex = 2
      activeApp.value.isShow = false
      activeApp.value = openedApps.value[openedApps.value.length - 1] || null
      resetActiveApp()
    }
  }

  const showApp = (appID: string) => {
    const app = openedApps.value.find((app) => app.appID === appID)
    if (!app) return
    handleActiveApp(appID)
    app.isShow = true
  }

  const hideApp = (appID: string) => {
    const app = openedApps.value.find((app) => app.appID === appID)
    if (!app) return
    resetActiveApp()
    app.isShow = false
  }

  const hideAllApps = () => {
    openedApps.value.forEach((app) => {
      app.isShow = false
    })
  }

  // 当前app是显示还是隐藏
  const isShowApp = (appID: string) => {
    const app = openedApps.value.find((app) => app.appID === appID)
    return app?.isShow
  }

  const openApp = (appID: string) => {
    const app = apps.value.find((app) => app.appID === appID)
    if (!app) return
    showApp(appID)
    if (openedApps.value.find((app) => app.appID === appID)) {
      activeApp.value = app
      return
    }
    openedApps.value.push(app)
    app.zIndex = zIndex.value
    app.isShow = true
    activeApp.value = app
  }
  const openLauncher = () => {
    isOpenLauncher.value = true
  }

  const closeLauncher = () => {
    isOpenLauncher.value = false
  }

  return {
    apps,
    openedApps,
    activeApp,
    appCount,
    isOpenLauncher,
    menuCommand,
    closeApp,
    openApp,
    showApp,
    hideApp,
    isShowApp,
    handleActiveApp,
    isActiveApp,
    updateAppPosition,
    hideAllApps,
    openLauncher,
    closeLauncher,
    resetActiveApp,
    setMenuCommand
  }
})
