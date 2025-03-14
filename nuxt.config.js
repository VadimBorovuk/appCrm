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
    preference: 'light', // За замовчуванням буде 'light'
    dataValue: 'theme',  // Додає `data-theme="light"` у <html>
    classSuffix: '',
    storageKey: 'nuxt-color-mode' // Ключ для LocalStorage
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
