<script setup>
import { computed, onMounted, ref } from "vue"
import dayjs from "dayjs"
import Fairy from "./components/Fairy.vue"
import Dots from "./components/Dots.vue"
import Portal from "./components/Portal.vue"

const date = ref(dayjs())
const formated = computed(() => date.value.format("LLLL:ss"))

onMounted(() => {
  setInterval(() => {
    date.value = dayjs()
  }, 1000)
})
</script>

<template>
  <header class="w-full flex justify-center pt-24">
    <h1 class="text-4xl tabular-nums text-slate-50 opacity-40">{{ formated }}</h1>
  </header>
  <main>
    <Fairy class="absolute bottom-48 left-64"></Fairy>
    <Dots></Dots>
    <Portal class="absolute bottom-12 right-8" :width="300" :height="300"></Portal>
  </main>
</template>
