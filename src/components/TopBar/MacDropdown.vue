<template>
  <div class="mac-navbar">
    <n-dropdown
      v-for="item in menuItems"
      :key="item.key"
      :options="item.children"
      @select="handleSelect"
      trigger="hover"
      placement="bottom-start"
    >
      <span class="menu-item">{{ item.label }}</span>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

interface DropdownOption {
  label: string | (() => any)
  key: string | number
  children?: DropdownOption[]
  disabled?: boolean
}

const props = defineProps<{
  menuItems: DropdownOption[]
}>()

const emit = defineEmits<{
  (e: 'select', key: string | number): void
}>()

function handleSelect(key: string | number) {
  emit('select', key)
}
</script>

<style scoped>
.menu-item {
  cursor: pointer;
  margin-right: 0.8rem;
  font-size: 0.8rem;
}
</style>
