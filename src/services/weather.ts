import http from "./http"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const lat = "50.360600"
const lng = "8.735760"

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=de-DE&appid=${apiKey}`

export interface Weather {
  base: string
  name: string
  clouds: object
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number
    temp_min: number
  }
  wind: { speed: number; deg: number; gust: number }
  weather: {
    id: number
    main: "Rain" | "Clouds" | "Clear" | "Snow" | "Extreme"
    description: string
    icon: string
  }[]
}

export function getWeather() {
  return http.get<Weather>(apiUrl, {
    cache: {
      ttl: 1000 * 60 * 60,
    },
  })
}
