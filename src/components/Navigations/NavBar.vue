<script setup lang="ts">
import { QueueListIcon } from "@heroicons/vue/24/outline";
import Image from '@/components/UI/Image.vue'
import { navigations } from '@/router'
import { useRoute } from 'vue-router'
import components from '@/data/components'

const route = useRoute()

</script>

<template>
  <div :class="`navbar
  ${!components.navbarTransparent?'shadow-md bg-base-100/50 backdrop-blur-md':'bg-none text-white'}
   fixed top-0 min-h-0 py-0 page-paddings z-[10]`">
    <div class="navbar-start">
      <label for="nav-drawer" class="btn btn-ghost rounded-none drawer-button h-14 lg:hidden">
        <QueueListIcon :class="`h-6 w-6 ${components.navbarTransparent?'text-white':'text-black'}`" />
      </label>
      <a class="btn h-14 btn-ghost rounded-none text-xl px-2" @click="$router.push('home')">
        <Image :src="`${components.navbarTransparent?'/Only-Feng_light.png':'/Only-Feng.png'}`"
               alt="OnlyFeng" picture-class="h-full w-auto" class="h-full w-auto scale-[1.2]"></Image>
      </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="(navItem, index) in navigations" :key="index" class="px-1">
          <a :class="`${route.name == navItem.pageName?'hover:bg-neutral/75 text-neutral-content':''} px-2`"
             @click="$router.push(navItem.pageName)" v-if="!navItem.hidden" :disabled="route.name == navItem.pageName">
            <component :is="navItem.icon" class="icon h-5 w-5" /> {{navItem.displayName}}
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn btn-ghost btn-circle" target="_blank">
        <i class="fa-brands fa-github-alt text-xl"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
