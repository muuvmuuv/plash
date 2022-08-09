<script setup lang="ts">
/**
 * Ideas:
 *
 * - https://codepen.io/ste-vg/pen/GqaZbo
 * - https://codepen.io/motorlatitude/pen/DqGrmQ
 */

import { computed, onMounted, ref } from "vue"
import { getWeather, Weather } from "../services/weather"
import Cloud, { Props as WeatherProps } from "./Cloud.vue"

let weather = ref<Weather>()

const feels_like = computed<number>(() => {
  if (!weather.value) return 0
  return Math.round(weather.value.main.feels_like)
})

const weather_type = computed<WeatherProps["type"]>(() => {
  if (!weather.value) return "hot"
  const {
    main: { temp, feels_like },
    weather: w,
  } = weather.value
  const group = w[0].main

  if (group === "Clouds") return "cloudy"
  if (group === "Rain") return "stormy"
  if (group === "Snow") return "stormy"
  if (group === "Extreme") return "breezy"
  if (group === "Clear") {
    if (temp > feels_like) return "hot"
    if (temp < feels_like) return "cloudy"
  }

  console.warn("Unknown weather group:", group)

  return "hot"
})

async function loadWeatherData() {
  const { data } = await getWeather()
  weather.value = data
}

onMounted(() => {
  loadWeatherData()

  setInterval(() => {
    loadWeatherData()
  }, 1000 * 60 * 10)
})
</script>

<template>
  <div v-if="weather" class="relative pt-4">
    <Cloud :type="weather_type"></Cloud>
    <div class="feel text-6xl font-extralight tabular-nums slashed-zero absolute top-2">
      {{ feels_like }}&deg;
    </div>
  </div>
</template>

<style lang="scss">
.feel {
  color: rgba(255, 255, 255, 0.6);
}
</style>
