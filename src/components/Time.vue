<script setup>
import { computed, onMounted, ref } from "vue"
import dayjs from "dayjs"

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
</template>
