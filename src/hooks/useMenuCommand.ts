// src/hooks/useMenuCommand.ts

import { watch } from 'vue'
import type { Ref } from 'vue' // 使用 type 关键字进行类型导入
import { useAppsStore } from '@/stores/apps'

// @ts-ignore
/**
 * 自定义 Hook，用于监听 menuCommand 的变化并执行相应的命令操作。
 *
 * @param menuCommandRef - 被监听的菜单命令的引用（Ref）。
 * @param commandMap - 命令映射表，将命令标识符映射到具体的执行函数。
 */
export function useMenuCommand(
  menuCommandRef: Ref<string | number | null>,
  commandMap: Record<string | number, () => void>
) {
  const appsStore = useAppsStore()
  const { setMenuCommand } = appsStore

  watch(menuCommandRef, (val) => {
    if (val && commandMap[val]) {
      commandMap[val]()
    }
    setMenuCommand(null)
  })
}
