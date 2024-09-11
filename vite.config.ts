import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

const prefix = "superoscar"
const assetFile = `${prefix}.[name].[hash].[ext]`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: `js/${prefix}.[hash].js`,
        chunkFileNames: `js/${prefix}.[name].[hash].js`,
        assetFileNames(meta) {
          if(meta.name!.endsWith(".css")) {
            return `css/${assetFile}`
          }
          if(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.gif'].some(ext => meta.name!.endsWith(ext))) {
            return `images/${assetFile}`
          }
          return `assets/${assetFile}`
        },
      }
    }
  }
})
