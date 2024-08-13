<script lang="ts" setup>
import { ref } from 'vue';
import Window from '@/components/Window/Window.vue';
import WallpaperStore from "@/apps/wallpapers/WallpaperStore.vue";
</script>

<template>
  <Window app-i-d="wallpapers" title="Wallpapers">
    <WallpaperStore />
  </Window>
</template>
