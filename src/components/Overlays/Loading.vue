<template>
  <div id="loading" ref="loading_anim">
    <div class="LoadingContainer">
      <Image src="/SFM_Speaker.png" class="SFM" alt="SulphurDXD Fumo Speaker Loading" />
    </div>
    <div id="loading_indicator" ref="loading_icon">
      <p>Now Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Image from '@/components/UI/Image.vue'
import components from '@/data/components'


const iframeRef = ref<HTMLIFrameElement | null>(null);

const emit = defineEmits(['check-loading'])
const loading_anim = ref<HTMLDivElement>()
const loading_icon = ref<HTMLDivElement>()

// 加入
const inTransition = (next: Function) => {
  components.loadingEnd = false
  if(iframeRef.value) {iframeRef.value.contentWindow?.postMessage("reload");}
  // 最后一片淡入时长
  loading_anim.value?.classList.remove("loading_out");
  // 更新加载状态
  setTimeout(() => {
    next();
    emit("check-loading")
    loading_icon.value?.classList.remove("loading_out");
  }, 100);
}
// 退出
const outTransition = () => {
  loading_icon.value?.classList.add("loading_out");
  setTimeout(() => {
    loading_anim.value?.classList.add("loading_out");
    console.log(loading_anim.value)
    components.loadingEnd = true;
  }, 350);
}
defineExpose({inTransition, outTransition})
</script>
<style scoped lang="postcss">
* {
  --delay: 1000ms;
}

#loading.loading_out {
  opacity: 0;
  pointer-events: none;
  transition: pointer-events 0s linear calc(var(--delay)),
  opacity calc(var(--delay)) ease;
}

#loading {
  @apply fixed top-0 right-0 left-0 bottom-0 z-[114514];
  background-color: #fff2bf;
  opacity: 1;
  transition: opacity 200ms ease;
}

#loading iframe {
  @apply w-full h-full;
  color-scheme: none;
}

#loading_indicator {
  @apply absolute bottom-0 left-0
  flex flex-col items-center z-[114515] p-[20px] gap-3;
  opacity: 1;
  transition: all 250ms ease;
}
#loading_indicator.loading_out {
  opacity: 0;
}
#loading_indicator p {
  @apply text-3xl font-bold;
  animation: loading-text-animate 0.8s ease infinite;
}
@keyframes loading-text-animate {
  from {
    opacity:1
  }
  50% {
    opacity:0.3
  }
  to {
    opacity:1
  }
}
.LoadingContainer {
  @apply w-full h-full flex justify-center items-center;
  background: url("/crossBG.png");
  background-size: 100px;
  animation: bg-move 1s linear infinite;
}
@keyframes bg-move {
  from {
    background-position: 100px 0px;
  }
  to {
    background-position: 0px 100px;
  }
}
</style>
<style>
.SFM {
  scale: 0.9;
  animation: loading-fumo-animate 0.3s ease-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
@keyframes loading-fumo-animate {
  from {
    transform: translateY(25px);
  }
  to {
    transform: translateY(-25px);
  }
}
</style>