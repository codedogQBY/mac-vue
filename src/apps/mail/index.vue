<script lang="ts" setup>
import Window from "@/components/Window/Window.vue";
import { ref } from "vue";
const mails = ref([
  { id: 1, name: "Inbox" },
  { id: 2, name: "Sent" },
  { id: 3, name: "Drafts" },
]);
</script>

<template>
  <Window app-i-d="mail" title="Mail">
    <div>
      <h1>Mail</h1>
      <p>Here is a list of your mail folders:</p>
      <ul>
        <li v-for="mail in mails" :key="mail.id">
          {{ mail.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>


