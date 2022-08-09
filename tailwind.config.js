import defaultTheme from "tailwindcss/defaultTheme.js"

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter var", "Inter", ...defaultTheme.fontFamily.sans],
      serif: ["Inter var", "Inter", ...defaultTheme.fontFamily.serif],
      mono: ["JetBrains Mono", "IBM Plex Mono", ...defaultTheme.fontFamily.mono],
    },
    container: {
      center: true,
    },
    extend: {},
  },

  plugins: [],
  corePlugins: {
    float: false,
  },
}
