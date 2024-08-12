<script lang="ts" setup>
import Window from '@/components/Window/Window.vue'
import { GithubOne } from '@icon-park/vue-next'
import { useMenuCommand } from '@/hooks/useMenuCommand'
import { defineProps, toRef } from 'vue'

const props = defineProps<{
  menuCommand: string | number | null
}>()

// 将 menuCommand 转换为 Ref，以便传递给自定义 Hook
const menuCommandRef = toRef(props, 'menuCommand')

const commandMap = {
  about_us: () => {
    window.open('https://www.baidu.com', '_blank')
  },
  // 添加更多命令
}

// 使用自定义 Hook 来处理 menuCommand
useMenuCommand(menuCommandRef, commandMap)

const techStack = {
  Vue: {
    icon: 'https://router.vuejs.org/logo.svg',
    link: 'https://cn.vuejs.org/'
  },
  Pinia: {
    icon: 'https://pinia.vuejs.org/logo.svg',
    link: 'https://pinia.vuejs.org/'
  },
  TypeScript: {
    icon: 'https://www.typescriptlang.org/icons/icon-144x144.png',
    link: 'https://www.typescriptlang.org/'
  },
  Vite: {
    icon: 'https://cn.vitejs.dev/logo.svg',
    link: 'https://cn.vitejs.dev/'
  },
  Less: {
    icon: 'https://less.bootcss.com/public/img/less_logo.png',
    link: 'https://less.bootcss.com/'
  },
  Eslint: {
    icon: 'https://img.icons8.com/?size=100&id=RBnCyho7WRn7&format=png&color=000000',
    link: 'https://eslint.org/'
  }
}
const github = 'https://' + 'github.com/zhenghaoz/vue3-windows11'
const icp = '沪ICP备2021000000号'
const about = {
  title: '关于本站',
  content: [
    '基于Vue3和TypeScript的仿Mac系统',
    '目前实现了自定义应用的功能',
    '后续会继续完善，欢迎Star和Fork'
  ]
}
</script>

<template>
  <Window app-i-d="about" title="关于本站">
    <template #header>
      <div class="header">
        <div class="header-title">{{ about.title }}</div>
      </div>
    </template>
    <div class="about">
      <div class="about-content">
        <div class="content-block">
          <h4 style="width: 12rem">技术栈：</h4>
          <div class="tech-stack">
            <div v-for="(value, key) in techStack" :key="key" class="tech-item">
              <a :href="value.link" target="_blank">
                <img :src="value.icon" alt="" />
                <span>{{ key }}</span>
              </a>
            </div>
          </div>
        </div>
        <div class="content-block">
          <h4 style="width: 5rem">关于本站：</h4>
          <div class="about-list">
            <div v-for="(item, index) in about.content" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="content-block">
          <h4>GitHub：</h4>
          <a :href="github" target="_blank">
            <GithubOne size="30" />
          </a>
        </div>
        <div class="content-block">
          <h4>备案号：</h4>
          <div>{{ icp }}</div>
        </div>
      </div>
    </div>
  </Window>
</template>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  color: white;
  background-color: #007bff;
  border-radius: 5px 5px 0 0;
  .header-title {
    text-align: center;
    font-size: 1.1rem;
    font-weight: bold;
  }
}

.about {
  padding: 1.5rem;
  font-family: 'Arial', sans-serif;
  background: #f9f9f9;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  .about-content {
    .content-block {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      h4 {
        margin-right: 1rem;
        color: #333;
        font-size: 1rem;
        font-weight: normal;
      }
      .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        .tech-item {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          transition: transform 0.2s ease;
          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #333;
            img {
              width: 24px;
              height: 24px;
              margin-right: 0.5rem;
            }
            span {
              font-size: 0.9rem;
            }
          }
          &:hover {
            transform: translateY(-2px);
            cursor: pointer;
          }
        }
      }
      .about-list {
        div {
          margin-bottom: 0.5rem;
          color: #555;
          font-size: 0.9rem;
        }
      }
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #007bff;
        font-size: 0.9rem;
        cursor: pointer;
        &:hover {
          color: #0056b3;
        }
      }
    }
  }
}

.about-content a img {
  transition: transform 0.2s ease;
}

.about-content a:hover img {
  transform: scale(1.05);
}
</style>
