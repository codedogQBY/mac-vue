<script lang="ts" setup>
</script>

<template>
  <div class="dock-container">
    <div class="dock-bar">
    </div>
  </div>
</template>

<style lang="less">
.dock-container{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5.2rem;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  .dock-bar{
    width: 1000px;
    background-color: hsla(var(--system-color-light-hsl), .4);
    box-shadow: inset 0 0 0 .2px hsla(var(--system-color-grey-100-hsl), .7), 0 0 0 .2px hsla(var(--system-color-grey-900-hsl), .7), #0000004d 2px 5px 19px 7px;
    position: relative;
    padding: .3rem;
    border-radius: 1.2rem;
    height: 100%;
    display: flex;
    align-items: flex-end;
    transition: transform .3s ease;
  }
}
</style>
