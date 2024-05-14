<script setup lang="ts">
import Window from '@/components/Window/Window.vue'
</script>

<template>
  <Window app-i-d="vue">
    <div class="container">
      Hello Word
    </div>
  </Window>
</template>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
}
</style>
