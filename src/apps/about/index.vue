<script lang="ts" setup>
import Window from "@/components/Window/Window.vue";
import { reactive } from 'vue'
const about = reactive({
  title: "Mac Vue",
  version: "v0.0.1 2024-08-06 22:22",
  copyright: "本项目所用MacOS图标版权为Apple.Inc所有,向MacOS致敬!",
})
</script>

<template>
  <Window app-i-d="about" title="关于本站">
   <template #header>
      <div class="header">
        <div class="header-title">{{ about.title }}</div>
      </div>
    </template>
    <div class="about">
      <div class="top">
        <i class="iconfont icon-apple1"></i>
        <div class="info">
          <div class="title">{{ about.title }}</div>
          <div class="version">{{ about.version }}</div>
        </div>
      </div>
      <div class="badges">
        <img src="https://svg.hamm.cn/gitee.svg?type=star&user=hamm&project=mac-ui&logo=yes" />
        <img src="https://svg.hamm.cn/gitee.svg?user=hamm&project=mac-ui&type=issue&logo=yes" />
      </div>
      <div class="copyright">{{ about.copyright }}</div>
    </div>
  </Window>
</template>

<style scoped lang="less">
.header{
  display: flex;
  justify-content: center;
  .header-title {
    text-align: center;
  }
}
.about {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #c7c6c6;
  color: #333;
  text-shadow: none;
  font-weight: 300;
  .top {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding: 20px 40px;
    .iconfont {
      font-size: 48px;
      margin-right: 20px;
    }
    .info {
      flex-grow: 1;

      .title {
        font-size: 24px;
      }

      .version {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .badges {
    text-align: center;
    img {
      margin: 0px 3px;
    }
  }
  .copyright {
    font-size: 12px;
    color: #999;
    padding: 20px;
    text-align: center;
  }
}
</style>
