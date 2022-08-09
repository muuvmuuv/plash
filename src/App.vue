<script setup>
import Morphing from "./components/morphing/Morphing.vue"
import Weather from "./components/Weather.vue"
</script>

<template>
  <main class="grid grid-rows-6 grid-cols-12 gap-4 w-full h-full p-6">
    <section class="col-span-3 row-span-2">
      <Weather class="ml-2"></Weather>
    </section>
  </main>

  <Morphing class="absolute top-0 left-0 -z-10"></Morphing>
</template>
