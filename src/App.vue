<script setup>
import { Alignment, Fit, Layout, Rive } from "@rive-app/webgl"
import { onMounted, ref } from "vue"
import Weather from "./components/Weather.vue"

const canvas = ref(null)

onMounted(() => {
  const l = new Layout({
    fit: Fit.Cover,
    alignment: Alignment.Center,
  })

  const r = new Rive({
    src: "/rivs/rainy_lake.riv",
    canvas: canvas.value,
    autoplay: true,
    artboard: "Raining",
    layout: l,
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas()
    },
  })
})
</script>

<template>
  <!-- <video src="/cyberpunk.mp4" autoplay muted :controls="false" loop></video> -->
  <canvas class="bg" ref="canvas"></canvas>

  <main class="grid grid-rows-6 grid-cols-12 gap-4 w-full h-full p-6">
    <section class="col-span-3 row-span-2">
      <Weather class="ml-2"></Weather>
    </section>
  </main>
</template>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
