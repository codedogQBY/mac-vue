<script lang="ts" setup>
import {defineProps} from 'vue';

const props = defineProps<{
  appID: string
  title: string
  mouseX?: number
}>()

const {appID, title} = props
const iconSrc = `/app-icons/${appID}.png`
</script>

<template>
  <button class="dock-button">
    <p class="dock-title">
      {{ title }}
    </p>
    <img :src="iconSrc" :style="{width:`3.6rem`}" alt="app icon"/>
  </button>
</template>

<style lang="less">
.dock-button {

  border-radius: 1.2rem;
  transition: transform .2s ease;
  padding: 0.1rem;
  margin: 0.4rem;

  .dock-title {
    display: none;
  }

  img {
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.5) translateY(-1rem);

    .dock-title {
      display: block;
      position: absolute;
      top: -1.6rem;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background-color: hsla(var(--system-color-light-hsl), 0.4);
      color: white;
      padding: 0.2rem 0.6rem;
      border-radius: 0.4rem;
      font-size: .8rem;
      white-space: nowrap;

      &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 0.4rem solid transparent;
        border-top-color: hsla(var(--system-color-light-hsl), 0.4);
      }
    }
  }
}
</style>
