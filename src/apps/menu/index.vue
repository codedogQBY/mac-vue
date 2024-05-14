<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const menus = ref([
  { id: 1, name: 'File Explorer' },
  { id: 2, name: 'Mail' },
  { id: 3, name: 'GitHub' },
  { id: 4, name: 'Friends' },
]);
</script>

<template>
  <Window app-i-d="menu" title="Menu">
    <div>
      <h1>Menu</h1>
      <p>Here is a list of your menus:</p>
      <ul>
        <li v-for="menu in menus" :key="menu.id">
          {{ menu.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
