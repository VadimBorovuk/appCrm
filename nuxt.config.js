import {cssConfig, fontsConfig, i118Config, modulesConfig, pluginsConfig, runtimeEnvConfig} from "./config/main.js";
import {createWebHashHistory} from "vue-router";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-27',
  devtools: {enabled: true},
  future: {
    compatibilityVersion: 4
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/customFavicon.png' }
      ]
    }
  },
  modules: modulesConfig,
  css: cssConfig,
  fonts: fontsConfig,
  i18n: i118Config,
  runtimeConfig: runtimeEnvConfig,
  plugins: pluginsConfig,
  // for notification
  notivue: {
    position: 'top-center',
    limit: 5,
    enqueue: true,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 1500
      }
    }
  },
  routeRules:{
    '/settings/**': {ssr: false}
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
  }
})
