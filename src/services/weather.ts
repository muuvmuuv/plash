import http from "./http"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const lat = "50.360600"
const lng = "8.735760"

// const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&lang=de-DE&exclude=minutely,hourly,alerts&appid=${apiKey}`

const apiUrl = `https://api.openweathermap.org/data/2.5`

export function getWeather() {
  return http.get<OwmCurrent>(
    `${apiUrl}/weather?lat=${lat}&lon=${lng}&units=metric&lang=de-DE&appid=${apiKey}`,
    {
      cache: {
        ttl: 1000 * 60 * 60,
      },
    },
  )
}

export function getForecast() {
  return http.get<OwmDaily>(
    `${apiUrl}/forecast?lat=${lat}&lon=${lng}&units=metric&lang=de-DE&appid=${apiKey}`,
    {
      cache: {
        ttl: 1000 * 60 * 60 * 24,
      },
    },
  )
}

export interface OwmWeather {
  id: number
  main: "Rain" | "Clouds" | "Clear" | "Snow" | "Extreme"
  description: string
  icon: string
}

export interface OwmMain {
  feels_like: number
  humidity: number
  pressure: number
  temp: number
  temp_max: number
  temp_min: number
}

export interface OwmSystem {
  id: number
  type: number
  country: string
  sunrise: number
  sunset: number
}

export interface OwmClouds {
  all: number
}

export interface OwmCurrent {
  id: number
  base: string
  clouds: OwmClouds
  cod: number
  dt: number
  main: OwmMain
  name: string
  sys: OwmSystem
  timezone: number
  visibility: number
  weather: OwmWeather[]
}

export interface OwmWind {
  speed: number
  deg: number
  gust: number
}

export interface OwmDailyItem {
  clouds: OwmClouds
  dt: number
  dt_txt: string
  main: OwmMain
  weather: OwmWeather[]
  wind: OwmWind
}

export interface OwmDaily {
  city: OwmSystem
  cnt: number
  cod: string
  message: number
  list: OwmDailyItem[]
}
