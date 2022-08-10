import { createApp } from "vue"

import App from "./App.vue"

import "./index.scss"

import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)

import "dayjs/locale/de"
dayjs.locale("de")

createApp(App).mount("#app")

const style = document.createElement("style")
style.innerHTML = `:root { 
  --background: ${import.meta.env.DEV ? "silver" : "transparent"}; 
}`
document.head.appendChild(style)
