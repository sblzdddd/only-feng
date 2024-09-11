import { reactive } from 'vue'

export const components = reactive<{
  scroll: HTMLDivElement | null
  navbarTransparent: boolean
  loadingEnd: boolean
}>({
  scroll: null,
  navbarTransparent: false,
  loadingEnd: false
})

export default components