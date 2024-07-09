import vue from '@vitejs/plugin-vue'
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [
    vue()
  ],
  root: 'client',
  publicDir: '../public'
})