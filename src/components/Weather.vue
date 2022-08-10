<script setup lang="ts">
/**
 * Ideas:
 *
 * - https://codepen.io/ste-vg/pen/GqaZbo
 * - https://codepen.io/motorlatitude/pen/DqGrmQ
 */

import dayjs from "dayjs"
import { computed, onMounted, ref } from "vue"
import {
  getForecast,
  getWeather,
  OwmCurrent,
  OwmDaily,
  OwmDailyItem,
} from "../services/weather"
import Cloud, { Props as WeatherProps } from "./Cloud.vue"

let weather = ref<OwmCurrent>()
let forecast = ref<OwmDaily>()

function getWeatherType(
  group: string,
  temp: number,
  feels_like: number,
): WeatherProps["type"] {
  if (group === "Clouds") return "cloudy"
  if (group === "Rain") return "stormy"
  if (group === "Snow") return "stormy"
  if (group === "Extreme") return "breezy"
  if (group === "Clear") {
    if (temp >= feels_like) return "hot"
    if (temp < feels_like) return "cloudy"
  }
  console.warn("Unknown weather group:", group)
  return "hot"
}

const forecasts = computed(() => {
  if (!forecast.value) return []

  let forecastsUnsorted: Record<number, OwmDailyItem[]> = {}
  let forecasts: OwmDailyItem[] = []

  for (const fc of forecast.value.list) {
    // Sort by day

    const day = dayjs(fc.dt_txt).day()

    if (!forecastsUnsorted[day]) {
      forecastsUnsorted[day] = []
    }

    forecastsUnsorted[day].push(fc)
  }

  for (const fcs of Object.values(forecastsUnsorted)) {
    // Get median for day

    let index = Math.round(fcs.length / 2) - 1
    if (index < 0) index = 0
    let final: OwmDailyItem = fcs[index]

    final.main.temp = Math.round(
      fcs.reduce((a, f) => a + f.main.feels_like, 0) / fcs.length,
    )
    final.main.feels_like = Math.round(
      fcs.reduce((a, f) => a + f.main.feels_like, 0) / fcs.length,
    )

    forecasts.push(final)
  }

  forecasts = forecasts.sort((a, b) => a.dt - b.dt)

  return forecasts
})

async function loadWeatherData() {
  const { data } = await getWeather()
  weather.value = data
}

async function loadForecastData() {
  const { data } = await getForecast()
  forecast.value = data
}

onMounted(() => {
  loadWeatherData()
  loadForecastData()

  setInterval(() => {
    loadWeatherData()
    loadForecastData()
  }, 1000 * 60 * 60)
})
</script>

<template>
  <div class="flex items-center mt-4">
    <div v-if="weather" class="relative">
      <Cloud
        :type="
          getWeatherType(
            weather.weather[0].main,
            weather.main.temp,
            weather.main.feels_like,
          )
        "
      ></Cloud>
      <div class="feel text-6xl font-extralight tabular-nums slashed-zero absolute top-2">
        {{ Math.round(weather.main.feels_like) }}&deg;
      </div>
    </div>

    <div v-if="forecast" class="flex flex-col ml-5">
      <div v-for="f in forecasts" class="flex items-center text-md">
        <div class="w-8">
          {{ dayjs(f.dt_txt).format("dd") }}
        </div>
        <div class="font-light tabular-nums slashed-zero">
          {{ f.main.feels_like }}&deg;
        </div>
        <Cloud
          class="ml-2 -mt-0.5 opacity-70"
          :type="getWeatherType(f.weather[0].main, f.main.temp, f.main.feels_like)"
          :size="16"
        ></Cloud>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.feel {
  color: rgba(255, 255, 255, 0.6);
}
</style>
