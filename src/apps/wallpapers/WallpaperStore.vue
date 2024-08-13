<!-- WallpaperStore.vue -->
<template>
  <div class="wallpaper-store">
    <header class="titlebar">
      <span>Wallpapers</span>
    </header>

    <section class="main-area">
      <section class="selected-wallpaper-section">
        <div class="image" :style="{ backgroundImage: currentWallpaperThumb }" />

        <div class="info">
          <h2>{{ currentWallpaper.name }}</h2>
          <p class="wallpaper-type">{{ currentWallpaper.type }} wallpaper</p>

          <div v-if="currentWallpaper.type !== 'standalone'">
            <label>
              <input type="checkbox" v-model="canControlTheme" />
              Change dark/light mode as wallpapers change
            </label>
          </div>
        </div>
      </section>

      <section class="dynamic-wallpapers">
        <h2>Dynamic Wallpapers</h2>
        <div class="wallpapers">
          <div v-for="([id, wallpaper]) in dynamicWallpapers" :key="id" class="wallpaper-button">
            <button @click="changeWallpaper(id)" @mouseenter="preloadImage(wallpaper.image)">
              <img :src="wallpaper.thumbnail" :alt="`MacOS ${wallpaper.name} Wallpapers, dynamic`" />
            </button>
            <p>{{ wallpaper.name }}</p>
          </div>
        </div>
      </section>

      <section class="standalone-wallpapers">
        <h2>Standalone Wallpapers</h2>
        <div class="wallpapers">
          <div v-for="([id, wallpaper]) in standaloneWallpapers" :key="id" class="wallpaper-button">
            <button @click="changeWallpaper(id)" @mouseenter="preloadImage(wallpaper.image)">
              <img :src="wallpaper.thumbnail" :alt="`MacOS ${wallpaper.name} Wallpapers, standalone`" />
            </button>
            <p>{{ wallpaper.name }}</p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useWallpaperStore } from '@/stores/wallpaperStore';
import { wallpapersConfig } from '@/configs/wallpapers';

const wallpaperStore = useWallpaperStore();
const currentWallpaper = computed(() => wallpaperStore.currentWallpaper);
const canControlTheme = ref(wallpaperStore.canControlTheme);

const dynamicWallpapers = computed(() =>
    Object.entries(wallpapersConfig).filter(([, config]) => config.type === 'dynamic')
);
const standaloneWallpapers = computed(() =>
    Object.entries(wallpapersConfig).filter(([, config]) => config.type === 'standalone')
);

const currentWallpaperThumb = computed(() => `url(${currentWallpaper.value.image})`);

function changeWallpaper(wallpaperName: string) {
  wallpaperStore.setWallpaper(wallpaperName);
}

function preloadImage(url: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = 'image';
  document.head.appendChild(link);
}
</script>

<style lang="less">
.wallpaper-store {
  background-color: var(--system-color-light);
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  overflow-y: hidden;
}

.titlebar {
  display: flex;
  justify-content: center;
  padding: 0.9rem 1rem;
  border-bottom: solid 0.9px hsla(var(--system-color-dark-hsl), 0.3);
}

.main-area {
  overflow-y: auto;
  padding: 1rem;
}

.selected-wallpaper-section {
  display: grid;
  gap: 1rem;
  .image {
    width: 30rem;
    height: auto;
    border-radius: 1rem;
    aspect-ratio: 16 / 10;
    background-size: cover;
    background-position: center;
  }
}

.dynamic-wallpapers,
.standalone-wallpapers {
  .wallpapers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1rem;
  }
}

.wallpaper-button button {
  aspect-ratio: 1 / 1;
}

.wallpaper-button img {
  width: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
  transition: box-shadow 100ms ease-in;
}

.wallpaper-button img:hover {
  box-shadow: 0 0 0 0.25rem hsla(var(--system-color-primary-hsl), 0.7);
}
</style>
