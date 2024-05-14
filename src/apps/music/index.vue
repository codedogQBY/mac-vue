<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const music = ref([
  { id: 1, name: 'Album 1' },
  { id: 2, name: 'Album 2' },
  { id: 3, name: 'Album 3' },
]);
</script>

<template>
  <Window app-i-d="music" title="Music">
    <div>
      <h1>Music</h1>
      <p>Here is a list of your music albums:</p>
      <ul>
        <li v-for="album in music" :key="album.id">
          {{ album.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
