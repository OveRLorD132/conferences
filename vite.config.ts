import vue from '@vitejs/plugin-vue'
import {defineConfig} from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true,
      vueTsc: true
    })
  ],
  root: 'client',
  publicDir: '../public'
})