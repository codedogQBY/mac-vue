<script lang="ts" setup>
import Window from "@/components/Window/Window.vue";
import { ref } from "vue";
const repos = ref([
  { id: 1, name: "vue" },
  { id: 2, name: "react" },
  { id: 3, name: "angular" },
]);
</script>

<template>
  <Window app-i-d="github" title="GitHub">
    <div>
      <h1>GitHub</h1>
      <p>Here is a list of your repositories:</p>
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          {{ repo.name }}
        </li>
      </ul>
    </div>
  </Window>
</template>
