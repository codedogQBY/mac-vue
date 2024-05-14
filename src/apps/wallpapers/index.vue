<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const wallpapers = ref([
  { id: 1, name: 'Wallpaper 1' },
  { id: 2, name: 'Wallpaper 2' },
  { id: 3, name: 'Wallpaper 3' },
]);
</script>

<template>
  <Window app-i-d="wallpapers" title="Wallpapers">
    <div>
      <h1>Wallpapers</h1>
      <p>Here is a list of your wallpapers:</p>
      <ul>
        <li v-for="wallpaper in wallpapers" :key="wallpaper.id">
          {{ wallpaper.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
