<template>
  <header class="top-bar">
    <div class="left">
      <div class="menus">
        <Apple class="menu" theme="filled" />
        <div class="menu" v-for="config in menuConfigs" :key="config.title">
          {{config.title}}
        </div>
      </div>
    </div>
    <div class="right">
      <Drawer
          v-model:visible="visible"
      >
        <div @click="toggleDrawer">
          <RightTime />
        </div>
        <template #content>
          <div>Drawer Content</div>
        </template>
      </Drawer>
    </div>
  </header>
</template>

<script lang="ts" setup>
import RightTime from '@/components/TopBar/components/special/RightTime.vue'
import Drawer from "@/components/common/Drawer.vue";
import { Apple } from '@icon-park/vue-next'
import { ref } from 'vue'

const visible = ref(false)
const toggleDrawer = () => {
  visible.value = !visible.value
}
const menuConfigs = ref([
  {
    title: '访达'
  },
  {
    title: '文件'
  },
  {
    title: '编辑'
  },
  {
    title: '显示'
  },
  {
    title: '前往'
  },
  {
    title: '窗口'
  },
  {
    title: '帮助'
  }
])
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
