<template>
  <header class="top-bar">
    <div class="left">
      <div class="menus">
        <Apple class="menu" theme="filled" />
        <MacDropdown
            :menuItems="menuOptions"
            @select="handleSelect"
        />
      </div>
    </div>
    <div class="right">
          <RightTime />
    </div>
  </header>
</template>

<script lang="ts" setup>
import RightTime from '@/components/TopBar/components/special/RightTime.vue'
import { Apple } from '@icon-park/vue-next'
import {computed} from 'vue'
import MacDropdown from './MacDropdown.vue';
import { storeToRefs } from 'pinia'
import { useAppsStore } from '@/stores/apps'

const appsStore = useAppsStore()
const {setMenuCommand} = appsStore
const { activeApp } = storeToRefs(appsStore)

const menuOptions = computed(()=>{
  return activeApp?.value?.menus ?? []
})

function handleSelect(key: string | number) {
  setMenuCommand(key)
}
</script>

<style lang="less" scoped>
.top-bar {
  height: 1.4rem;
  background-color: hsla(var(--system-color-light-hsl), 0.4);
  padding: 0.1rem 1rem;
  // 居中
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    margin-right: auto;
    .menus {
      display: flex;
      .menu {
        margin-right: 1rem;
        color: hsla(var(--system-color-light), 0.3);
        font-size: 0.8rem;
        cursor: pointer;
        &:hover {
          color: hsla(var(--system-color-light), 0.6);
        }
      }
    }
  }
  .right {
    margin-left: auto;
    cursor: default;
    user-select: none;
  }
}
</style>
