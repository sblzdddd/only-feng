<script setup lang="ts">

import { navigations } from '@/router'
</script>

<template>
  <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    <!-- Sidebar content here -->

    <li v-for="(navItem, index) in navigations" :key="index" class="">
      <a class="" @click="$router.push(navItem.pageName)" v-if="!navItem.hidden">
        <component :is="navItem.icon" class="icon h-5 w-5" /> {{navItem.displayName}}
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>