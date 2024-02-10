/// <reference types="histoire" />
/// <reference types="node" />
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { HstVue } from '@histoire/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  histoire: {
    plugins: [
      HstVue(),
    ],
    vite: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
    }
  },
})