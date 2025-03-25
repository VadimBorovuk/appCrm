/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/@nuxt/PersonalUI/**/*.{js,vue,ts}', // Додайте шлях до Nuxt PersonalUI
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'whiteLilac': {
          DEFAULT: 'var(--color-whiteLilac)',
          50: 'var(--color-whiteLilac-50)',
          100: 'var(--color-whiteLilac-100)',
          200: 'var(--color-whiteLilac-200)',
          300: 'var(--color-whiteLilac-300)',
          400: 'var(--color-whiteLilac-400)',
          500: 'var(--color-whiteLilac-500)',
          600: 'var(--color-whiteLilac-600)',
          700: 'var(--color-whiteLilac-700)',
          800: 'var(--color-whiteLilac-800)',
          900: 'var(--color-whiteLilac-900)',
          950: 'var(--color-whiteLilac-950)',
        },
        'waterloo': {
          DEFAULT: 'var(--color-waterloo)',
          50: 'var(--color-waterloo-50)',
          100: 'var(--color-waterloo-100)',
          200: 'var(--color-waterloo-200)',
          300: 'var(--color-waterloo-300)',
          400: 'var(--color-waterloo-400)',
          500: 'var(--color-waterloo-500)',
          600: 'var(--color-waterloo-600)',
          700: 'var(--color-waterloo-700)',
          800: 'var(--color-waterloo-800)',
          900: 'var(--color-waterloo-900)',
          950: 'var(--color-waterloo-950)',
        },
      }
    },
  },
  plugins: [],
};
