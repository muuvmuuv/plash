import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import glsl from "vite-plugin-glsl"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
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
