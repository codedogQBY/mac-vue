<script lang="ts" setup>
import Window from "@/components/Window/Window.vue";
import { ref } from "vue";
const files = ref([
  { id: 1, name: "Document.docx" },
  { id: 2, name: "Presentation.pptx" },
  { id: 3, name: "Spreadsheet.xlsx" },
]);
</script>

<template>
  <Window app-i-d="file" title="File Explorer">
    <div>
      <h1>File Explorer</h1>
      <p>Here is a list of your files:</p>
      <ul>
        <li v-for="file in files" :key="file.id">
          {{ file.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
