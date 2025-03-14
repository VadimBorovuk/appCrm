// https://nuxt.com/docs/api/configuration/nuxt-config

import {cssConfig, fontsConfig, i118Config, modulesConfig, pluginsConfig, runtimeEnvConfig} from "./config/main.js";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-27',
  devtools: {enabled: true},
  future: {
    compatibilityVersion: 4
  },
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
  },
  modules: modulesConfig,
  css: cssConfig,
  fonts: fontsConfig,
  i18n: i118Config,
  runtimeConfig: runtimeEnvConfig,
  plugins: pluginsConfig,
})
