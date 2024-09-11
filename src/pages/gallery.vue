<script setup lang="ts">

import Image from '@/components/UI/Image.vue'
import images from "@/assets/images.json"

const getLocalImageUrl = (name: string) => {
  name = name.replace("/", "")
  const urlObj = new URL(`../assets/images/${name}`, import.meta.url)
  if(urlObj.href && !urlObj.href.endsWith("undefined")) {
    // console.log(urlObj.href)
    return urlObj.href
  } else {
    console.error(`Could not resolve local image: ${name}`)
    return undefined
  }
}

const openImage = (image:string) => {
  const url = getLocalImageUrl(image)
  if(url) window.open(url, "_blank")
}
</script>

<template>
  <div class="min-h-screen page-paddings pt-20">
    <masonry
      :cols="{default: 6, 1440: 5, 1200: 4, 720: 3, 512: 2}"
      :gutter="{default: '20px', 700: '8px'}" :class="'masonry-root'"
    >
      <div class="container" v-for="(image, index) in images" :key="index" @click="openImage(image)">
        <Image :src="image" :alt="image" />
      </div>
    </masonry>

  </div>

</template>

<style scoped>

.masonry-root {
  @apply select-none;
}
.container {
  @apply bg-base-300 relative max-w-full overflow-hidden shadow-xl cursor-pointer rounded-md;
  outline: 5px transparent;
  margin-bottom: 20px;
  transition: all 250ms ease;
}
.container:hover {
  @apply shadow-yellow-200/50;
  scale: 1.12;
  z-index: 20;
  outline: 5px solid #ffee80;
  transform: translate(calc(var(--ox) / 40), calc(var(--oy) / 45));
}
.container:active {
  scale: 1.05;
}
</style>