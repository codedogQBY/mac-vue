<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const setting = ref([
  { id: 1, name: 'General' },
  { id: 2, name: 'Security' },
  { id: 3, name: 'Privacy' },
]);
</script>

<template>
  <Window app-i-d="setting" title="Setting">
    <div>
      <h1>Setting</h1>
      <p>Here is a list of your setting:</p>
      <ul>
        <li v-for="set in setting" :key="set.id">
          {{ set.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
