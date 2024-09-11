<template>
  <header class="header-container" ref="headerRef">
    <div class="cover" ref="coverRef">
      <Image :src="cover!" ref="headerImg" class="img-head" alt="Header Background"></Image>
      <div class="title-container darken" ref="titleRef">
        <h1 class="title_" style="opacity: 1!important;">{{ title }}</h1>
        <p class="subtitle">{{ subTitle }}</p>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import Image from '@/components/UI/Image.vue'
import components from '@/data/components'
import { setting } from '@/data/setting'

const titleRef = ref();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  image: {
    type: [String]
  },
  title: {
    type: [String]
  },
  cover: {
    type: [String]
  },
  subTitle: {
    required: false,
    type: [String]
  }
})

let headerHeight = -1

const coverRef = ref()
const headerRef = ref()

let scroll: HTMLElement | null = null

const Init = (scr: HTMLElement) => {
  scroll = scr;
  scroll.addEventListener("scroll", handleScroll);
}
const handleScroll = () => {
  if(!setting.parallax_bg) return;
  if(headerHeight < 0 && coverRef) {
    headerHeight = coverRef.value.clientHeight;
  }
  if(scroll) {

    var wScroll = scroll.scrollTop;

    if (wScroll <= headerHeight) {
      coverRef.value.style.transform = 'translate(0px, ' + wScroll/2  + 'px)';
      titleRef.value.style.transform = `translate(0px, ${-wScroll/10}px)`;
    }
  }

  if(headerRef.value) {
    var bounding = headerRef.value.getBoundingClientRect();

    if (bounding.bottom > 60 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100) {
      components.navbarTransparent = true;
    } else {
      components.navbarTransparent = false;
    }
  }
}
onBeforeUnmount( function() {
  scroll?.removeEventListener("scroll", handleScroll);
});

defineExpose({Init})
</script>

<style scoped lang="postcss">
header.header-container {
  position: relative;
  height: calc(10vw + 300px);
  width: 100%;
  overflow: hidden;
  box-shadow: inset black 0 0 0 0;
}

.title-container {
  @apply bg-black/30 w-full h-full flex flex-col items-center justify-center;
}

.cover {
  height: calc(10vw + 300px);
  width: 100%;
  position: absolute;
  transform: translate(0px, 0px);
  box-shadow: inset #00000040 0 -3px 10px 0;
}

.cover h1.title_ {
  @apply text-white text-[17vw] md:text-7xl;
  font-weight: 800;
  line-height: 1.4;
  filter: drop-shadow(0px 4px 6px #00000050);
}
.cover p.subtitle {
  @apply mb-0
  relative top-[-24px] text-white
  xl:text-3xl md:text-xl sm:text-[0.8rem] text-lg
  font-bold;
  opacity: 0.6;
}


</style>
<style>
.img-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  z-index: -1;
}
</style>
