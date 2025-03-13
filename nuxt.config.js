// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  tailwindcss: {
    exposeConfig: true // Додає можливість отримувати налаштування Tailwind в коді
  },
  dayjs: {
    plugins: ['utc', 'timezone'], // Підключаємо потрібні плагіни
  },

  typescript: {
    strict: false,
    shim: false
  }
})
