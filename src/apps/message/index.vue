<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
const messages = ref([
  { id: 1, name: 'Inbox' },
  { id: 2, name: 'Sent' },
  { id: 3, name: 'Drafts' },
]);
</script>

<template>
  <Window app-i-d="message" title="Message">
    <div>
      <h1>Message</h1>
      <p>Here is a list of your message folders:</p>
      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
