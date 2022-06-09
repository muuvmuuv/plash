import { createApp } from "vue"

import App from "./App.vue"

import "./index.scss"

import localizedFormat from "dayjs/plugin/localizedFormat"
import dayjs from "dayjs"
import "dayjs/locale/de"
dayjs.extend(localizedFormat)
dayjs.locale("de")

createApp(App).mount("#app")

const style = document.createElement("style")
style.innerHTML = `:root { 
  --background: ${import.meta.env.DEV ? "url('/bg.jpg')" : "transparent"}; 
}`
document.head.appendChild(style)
