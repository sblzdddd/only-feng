<template>
  <div class="drawer w-screen h-full overflow-hidden">
    <input id="nav-drawer" type="checkbox" class="drawer-toggle" v-model="isShowingSidebar" />
    <div class="drawer-content w-screen h-full overflow-x-hidden overflow-y-auto" ref="scroll">
      <!-- Page content here -->
      <NavBar />
      <Header v-if="!(GetPage($route.name)?.noHeader)" ref="headerRef" :cover="GetPage($route.name)?.cover"
              :title="GetPage($route.name)?.displayName" :subTitle="<string>route.name" />
      <router-view />
    </div>
    <div class="drawer-side z-[20]">
      <label for="nav-drawer" aria-label="close sidebar"
             :class="{'drawer-overlay':true, 'backdrop-blur-sm':isShowingSidebar}"></label>
      <SideBar />
    </div>
  </div>
  <Loading v-if="setting.loading" ref="loadingRef" @check-loading="CheckLoadingState()" />
</template>

<script setup lang="ts">
import NavBar from '@/components/Navigations/NavBar.vue'
import SideBar from '@/components/Navigations/SideBar.vue'
import Header from '@/components/Sections/Header.vue'
import Loading from '@/components/Overlays/Loading.vue'
import { nextTick, onMounted, ref } from 'vue'
import { setting } from '@/data/setting'
import { useRoute, useRouter } from 'vue-router'
import components from '@/data/components'
import { GetPage } from '@/router'
const router = useRouter();

const route = useRoute()

const loadingRef = ref();
const scroll = ref<HTMLDivElement>();

const headerRef = ref();

const isShowingSidebar = ref(false);
const CheckLoadingState = () => {
  // 每300毫秒检查页面是否加载完成
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      // 加载完成
      console.log("page loading completed");
      clearInterval(timer);


      components.navbarTransparent = true;

      // 回顶
      if(scroll.value) {
        scroll.value.scrollTop = 0;
        // scroll.value.scrollTop = 0;
        // 由于App.vue的onMounted再子组件之后，头部（依赖于页面滚动）初始化需要后置
        if(headerRef.value) {
          headerRef.value.Init(scroll.value);
        }
      }

      if(!setting.loading) return;
      // 淡出
      loadingRef.value.outTransition();
    }
  }, 500);
}
onMounted(() => {
  console.log(scroll.value)
  if(scroll.value) {
    // componentsVar.scroll = scroll.value;
    // headerRef.value.Init(scroll.value);
    components.scroll = scroll.value;
    headerRef.value.Init(scroll.value);
  }

  CheckLoadingState();
  // 切换页面时接入加载动画
  router.beforeEach((to, from, next) => {
    isShowingSidebar.value = false;
    if(!setting.loading) {
      next();
      return
    }
    console.log("loading overlay in")
    loadingRef.value.inTransition(next);
  });
  const DEFAULT_TITLE = '芥末异变';
  router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
      document.title = (to.meta.title as string) || DEFAULT_TITLE;
    });
  });
});

defineExpose({CheckLoadingState});
</script>

<style scoped>
</style>
