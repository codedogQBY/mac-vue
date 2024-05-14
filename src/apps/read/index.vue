<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const read = ref([
  { id: 1, name: 'Book 1' },
  { id: 2, name: 'Book 2' },
  { id: 3, name: 'Book 3' },
]);
</script>

<template>
  <Window app-i-d="read" title="Read">
    <div>
      <h1>Read</h1>
      <p>Here is a list of your books:</p>
      <ul>
        <li v-for="book in read" :key="book.id">
          {{ book.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
