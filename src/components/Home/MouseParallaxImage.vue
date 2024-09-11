<template>
  <div :class="`mouse-parallax-container z-[-1] ${blur? 'blur-xl':''}`" ref="containerRef">
    <Image alt="Random Background" :src="imageSrc" class="parallax-bg" style="z-index: -1;" ref="imageRef"></Image>
  </div>
</template>

<script setup lang="ts">
import Image from '@/components/UI/Image.vue'
import { onMounted, ref } from 'vue'
import components from '@/data/components'
import { setting } from '@/data/setting'
import images from "@/assets/images.json"

function randint(min:number, max:number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const props = withDefaults(
  defineProps<{
    margin?: number;
    blur?: boolean
  }>(),
  {
    margin: 100,
    blur: false,
  }
)

const activeArtwork = ref();
const imageRef = ref();
const containerRef = ref();

const imageSrc = ref<string>("")



defineExpose({activeArtwork})

function getRandomItem<T>(list: T[]): T | undefined {
  if (list.length === 0) return undefined; // Handle empty array case
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

onMounted(() => {
  if(setting.animation) window.onmousemove = handleEffects;
  let randomList: string[] = [...images]
  activeArtwork.value = getRandomItem(randomList);
  imageSrc.value = activeArtwork.value;
})
const handleEffects = (e:any) => {
  const scroll = components.scroll
  if (!scroll || !containerRef.value) {return}
  const c = containerRef.value;

  setTimeout(function(){
    const x = e.pageX;
    const y = e.pageY;
    const ox = (window.innerWidth / 2 - x) / (window.innerWidth) * props.margin / 2;
    const oy = (window.innerHeight / 2 - y) / (window.innerHeight) * props.margin / 2;
    c.style.setProperty('--ox', -ox + "px")
    c.style.setProperty('--oy', -oy + "px")
  }, 50)

}

</script>

<style lang="postcss">
.mouse-parallax-container {
  @apply absolute
  flex items-center justify-center;
  top: 0;
  left: 0;
  width: 100svw;
  height: 100svh;
  transition: filter 250ms ease, transform 50ms linear;
}

:root {
  --ox: 0;
  --oy: 0;
}

.mouse-parallax-container .parallax-bg {
  transform-origin: center center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-position: center 30%;
  z-index: -1;
  object-fit: cover;
  overflow: hidden;
  max-width: unset;
  scale: 1.05;
  transition: opacity 250ms ease, transform 50ms linear;
  transform: translate(var(--ox), var(--oy))
}

.image {
  @apply w-full;
}
</style>