export const i118Config = {
  lazy: true,
  defaultLocale: 'en',
  locales: [
    {code: 'en', name: 'English'},
    {code: 'uk', name: 'Українська'},
    {code: 'pt', name: 'Portuguese'},
    {code: 'es', name: 'Spanish'},
    {code: 'ru', name: 'Русский'}
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'cc_locale',
    alwaysRedirect: true
  },
  strategy: 'no_prefix', // Прибирає код мови з URL
}
