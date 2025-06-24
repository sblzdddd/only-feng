<script setup lang="ts">

import Image from '@/components/UI/Image.vue'

function OpenLink(link: string) {
  window.open(link, '_blank')
}
</script>

<template>
  <div class="flex flex-col lg:grid lg:grid-cols-2 flex-wrap px-5 lg:px-20 xl:px-52 my-10 gap-3 lg:gap-10">
    <div class="card-base grow" @click="OpenLink('https://logo-creator.sulphurdxd.online')">
      <div class="card-icon">
        <Image src="/slc.png" class="h-full" alt="slc" />
      </div>
      <div class="card-ti">
        <h1>SCHOOL-LOGO-CREATOR</h1>
        <p>创建奇奇怪怪的某校图标</p>
      </div>
    </div>
    <div class="card-base grow" @click="OpenLink('https://synthesize.sulphurdxd.online')">
      <div class="card-icon">
        <Image src="/SulphurDXD_Avatar.png" class="h-full" alt="slc" />
      </div>
      <div class="card-ti">
        <h1>合成 SulphurDXD</h1>
        <p>垃圾游戏</p>
      </div>
    </div>
    <div class="card-base grow" @click="OpenLink('https://pgor.sulphurdxd.online')">
      <div class="card-icon">
        <Image src="/SulphurDXD_Avatar.png" class="h-full" alt="slc" />
      </div>
      <div class="card-ti">
        <h1>PagaOnRhyme</h1>
        <p>寄翁对韵在线版，，，</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.card-base {
  @apply flex bg-base-200 rounded-md shadow-lg p-3 gap-3 cursor-pointer hover:scale-[1.05];
  transition: all 250ms ease;
}

.card-icon {
  @apply rounded-full aspect-square max-h-full h-[45px] lg:h-[60px] overflow-hidden;
}

.card-ti {
  @apply flex flex-col;
}

.card-ti h1 {
  @apply lg:text-3xl md:text-xl font-bold;
}

.card-ti p {
  @apply font-normal;
}
</style>