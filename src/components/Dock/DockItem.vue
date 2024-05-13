<script lang="ts" setup>
import {defineProps} from 'vue';
import { interpolate } from 'popmotion';
const props = defineProps<{
  appID:string
  title:string
  mouseX?:number
}>()
const {appID,title,mouseX} = props
const iconSrc = `/app-icons/${appID}.png`
</script>

<template>
  <botton>
<!--    <p class="dock-item-title">{{title}}</p>-->
    <span class="dock-item-logo">
      <img :src="iconSrc"/>
    </span>
  </botton>
</template>

<style lang="less">

</style>
