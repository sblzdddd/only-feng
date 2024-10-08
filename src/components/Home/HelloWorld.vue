<template>
  <div class="title-container relative">
    <div class="title" ref="titleRef">
      <h1 @mouseenter="hoverChanged('hover')"
          @mouseleave="hoverChanged('unhover')">
        502打胶网
      </h1>
      <p class="subtitle">{{ currentDian }}</p>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 right-0 flex p-2 justify-end items-center z-[-1]">
    <div class="badge badge-primary ml-2">v 0.5</div>
  </div>
</template>
<script lang='ts' setup>

import { onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import components from '@/data/components'
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/outline";
import { setting } from '@/data/setting'
import { dian } from '@/data/global'

const emit = defineEmits(['hover', 'unhover'])
const titleRef = ref();
const currentDian = ref<string>("当你开始怀疑的时候，说明你还不够抽象")

let hoverControl = true
let animationPlayed = false;

const hoverChanged = (s:string) => {
  if (!hoverControl) return;
  if(s === "hover") {
    emit("hover")
  } else {
    emit("unhover")
  }
}
const initAnimation = () => {
  const title: HTMLDivElement | null  = document.querySelector(".title")
  if(!title) return;
  title.style.opacity = "0";

}
const playAnimations = () => {
  if(animationPlayed) return;
  animationPlayed = true;
  const title: HTMLDivElement | null  = document.querySelector(".title")
  if(!title) return;
  const titleH1: HTMLHeadingElement | null = document.querySelector(".title h1")
  if(!titleH1) return;
  const subtitle: HTMLParagraphElement | null = document.querySelector(".subtitle")
  if(!subtitle) return;
  gsap.from(titleH1, {
    fontSize: "50px",
    letterSpacing: "7vw",
    duration: 1,
    ease: "circ.inOut",
    onComplete: () => {
      gsap.killTweensOf(titleH1)
      titleH1.style.fontSize = ""
      titleH1.style.letterSpacing = ""
    }
  });
  gsap.from(subtitle, {
    fontSize: "50px",
    letterSpacing: "2vw",
    duration: 1,
    ease: "circ.inOut",
    onComplete: () => {
      gsap.killTweensOf(subtitle)
      subtitle.style.fontSize = ""
      subtitle.style.letterSpacing = ""
    }
  });
  gsap.fromTo(title, {
    fontSize: "10px",
    opacity: "0.01"
  }, {
    duration: 2,
    opacity: "1.0",
    ease: "circ.out",
    onComplete: () => {
      gsap.killTweensOf(titleH1)
    }
  });
}
const handleScroll = () => {
  if(!titleRef.value) return;
  const scroll = components.scroll
  if(!scroll) return
  let headerHeight = window.innerHeight;

  var wScroll = scroll.scrollTop;

  if(setting.enable_blur) {
    if(wScroll > headerHeight / 3) {
      emit('hover')
      hoverControl = false
    } else if (!hoverControl) {
      emit('unhover')
      hoverControl = true
    }
  }

  if(setting.parallax_bg) {
    if (wScroll <= headerHeight) {
      titleRef.value.style.transform = `translate(0px, ${wScroll/2}px)`;
    }
  }
}
watch(() => components.loadingEnd, (val) => {
  if(setting.animation && val) {
    components.loadingEnd = false;
    initAnimation();
    setTimeout(() => {
      playAnimations()
    }, 250);
  }
})
function getRandomItem<T>(list: T[]): T | undefined {
  if (list.length === 0) return undefined; // Return undefined if the list is empty
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
onMounted(() => {
  const scroll = components.scroll
  scroll?.addEventListener("scroll", handleScroll);
  if(currentDian.value) currentDian.value = `"${getRandomItem(dian)}"`
})
</script>
<style>

.btn_>span {
  margin: 0 !important;
}
</style>
<style scoped lang="postcss">

.title-container {
  @apply grow flex flex-col gap-5
  justify-center items-center;
}
.title {
  @apply text-white gap-5
  flex flex-col justify-center;
}
.title h1 {
  @apply z-[10] pb-1 md:pb-[15px]
  text-[7vw] sm:text-5xl md:text-6xl lg:text-7xl
  font-bold tracking-normal md:tracking-wider text-center;
  background: linear-gradient(to right, #ffc74d, #a4ff5a);
  text-shadow: 0 3px 15px #ffffff3a;
  color: rgb(255, 255, 255);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-wrap: nowrap;
}
.title h2 {
  @apply z-[10]
  text-[7vw] sm:text-[1.6rem] md:text-xl lg:text-2xl
  font-bold;
  text-shadow: 0 3px 15px #ffffff3a;
  color: #ffffffc0;
}
.title p{
  @apply text-[1.5vw] sm:text-[1rem] lg:text-lg
  w-full text-center tracking-normal md:tracking-[10px] lg:tracking-[16px];
}
p.subtitle {
  @apply mb-0
  relative top-[-24px]
  xl:text-3xl md:text-xl sm:text-[0.8rem]
  font-bold;
  opacity: 0.6;
}
@keyframes ud {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>