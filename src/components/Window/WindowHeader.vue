<script lang="ts" setup>
import {defineEmits} from 'vue';

const emits = defineEmits(['close', 'minimize', 'maximize']);

const closeWindow = () => {
  emits('close');
};

const minimizeWindow = () => {
  emits('minimize');
};

const maximizeWindow = () => {
  emits('maximize');
};

</script>

<template>
  <div class="header">
    <!-- 苹果风格的三个小按钮：关闭、最小化、放大/缩小   -->
    <div class="buttons">
      <button class="close" @click="closeWindow"></button>
      <button class="minimize" @click="minimizeWindow"></button>
      <button class="maximize" @click="maximizeWindow"></button>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  .buttons{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
  }
  .content {
    min-height: 1.8rem;
  }
}

button {
  width: .75rem;
  height: .75rem;
  border-radius: 50%;
  margin-right: .3rem;
}

.close {
  background-color: #ff5f56;
}

.minimize {
  background-color: #ffbd2e;
}

.maximize {
  background-color: #27c93f;
}
</style>
