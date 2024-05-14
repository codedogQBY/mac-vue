<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const friends = ref([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Doe' },
]);
</script>

<template>
  <Window app-i-d="friends" title="Friends">
    <div>
      <h1>Friends</h1>
      <p>Here is a list of your friends:</p>
      <ul>
        <li v-for="friend in friends" :key="friend.id">
          {{ friend.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>

