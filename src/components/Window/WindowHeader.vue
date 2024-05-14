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
    <div>
      <button class="close" @click="closeWindow"></button>
      <button class="minimize" @click="minimizeWindow"></button>
      <button class="maximize" @click="maximizeWindow"></button>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  min-height: 30px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
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
