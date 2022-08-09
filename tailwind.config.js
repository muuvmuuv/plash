/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter var", "Inter"],
      serif: ["Inter var", "Inter"],
      mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
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
