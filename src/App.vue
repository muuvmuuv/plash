<script setup>
import Weather from "./components/Weather.vue"
</script>

<template>
  <video src="/cyberpunk.mp4" autoplay muted :controls="false" loop></video>

  <main class="grid grid-rows-6 grid-cols-12 gap-4 w-full h-full p-6">
    <section class="col-span-3 row-span-2">
      <Weather class="ml-2"></Weather>
    </section>
  </main>
</template>

<style scoped>
video {
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
