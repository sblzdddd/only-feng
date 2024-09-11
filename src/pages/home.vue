<script setup lang="ts">
import HelloWorld from '@/components/Home/HelloWorld.vue'
import MouseParallaxImage from '@/components/Home/MouseParallaxImage.vue'
import { ref } from 'vue'
import { setting } from '@/data/setting'
const blurBG = ref(false)
</script>

<template>
  <MouseParallaxImage :blur="blurBG"></MouseParallaxImage>
  <div :class="`home-content ${blurBG ? 'bg-black/70' : 'bg-black/50'}`" ref="headerRef">
    <HelloWorld
      @hover="() => {if(setting.enable_blur){blurBG=true;}}"
      @unhover="() => {if(setting.enable_blur){blurBG=false;}}"></HelloWorld>
  </div>
</template>

<style scoped>

.home-content {
  @apply w-screen h-[100lvh] p-0 flex;
  box-shadow: inset 0 -3px 10px 0 #00000033;
  transition: all 250ms ease;
}
.parallax-container .two-row {
  @apply flex flex-col
  md:grid md:grid-cols-2;
}
.parallax-container  .col-reverse {
  @apply flex-col-reverse;
}
.title-poem p{
  @apply text-sm opacity-[0.5];
}
.gallery-container {
  @apply px-2 md:px-16 lg:px-20 pb-20 pt-8 w-full min-h-[200vh]
  bg-base-300/30;
}
[data-theme='dark'] .gallery-container {
  @apply bg-base-300/90
}
.pagination-container {
  @apply w-full flex justify-center mt-10;
}
</style>