import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import glsl from "vite-plugin-glsl"

import postcss from "./postcss.config.js"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
  css: {
    postcss,
    devSourcemap: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\.(glsl|wgsl|vert|frag|vs|fs)$/i.test(id)) {
            return "glsl"
          }
          if (id.includes("dayjs")) {
            return "dayjs"
          }
          if (id.includes("gsap")) {
            return "gsap"
          }
          if (id.includes("three")) {
            return "three"
          }
        },
      },
    },
  },
})
