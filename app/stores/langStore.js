import {defineStore} from 'pinia';
import {useCookie} from 'nuxt/app';
import {useApiTranslate} from "~/api/translate.js";

export const useLangStore = defineStore('lang', () => {
  const locales = ref([
    {code: 'en', name: 'English'},
    {code: 'uk', name: 'Українська'},
    {code: 'pt', name: 'Portuguese'},
    {code: 'es', name: 'Spanish'},
    {code: 'ru', name: 'Русский'}
  ]);

  const locale = useCookie('cc_locale', {
    default: () => {
      return process.server ? 'en' : (document.cookie.includes('cc_locale') ? document.cookie.match(/cc_locale=([^;]*)/)?.[1] : 'en');
    },
    maxAge: 31536000
  });

  async function loadMessages(locale, i18n) {
    if (process.client) {
      let selectedLang = {};
      let storage_locale = JSON.parse(localStorage.getItem(`nf_locale_${locale}`));
      if (storage_locale) {
        let now = new Date();
        let storage_locale_expiring = new Date(storage_locale.expires);
        if (storage_locale_expiring < now) {
          await loadNewTranslates(locale, selectedLang, i18n);
        } else {
          i18n.setLocaleMessage(locale, storage_locale.locales);
        }
      } else {
        await loadNewTranslates(locale, selectedLang, i18n);
      }
    }
  }

  async function loadNewTranslates(locale, selectedLang, i18n) { // Додано параметр i18n
    try {
      const response = await useApiTranslate().transGetByLang(locale);
      response.data.data.forEach((item) => {
        selectedLang[item.code] = item.value;
      });

      let date = new Date();
      localStorage.setItem(
          `nf_locale_${locale}`,
          JSON.stringify({
            locales: selectedLang,
            expires: date.getTime() + 1800000, // Переклади зберігаються 30 хвилин
          })
      );

      i18n.setLocaleMessage(locale, selectedLang); // Використовуємо i18n
    } catch (error) {
    }
  }

  async function selectLocale(newLocale, i18n) { // Додано параметр i18n
    if (locale.value !== newLocale) {
      locale.value = newLocale;
      await loadMessages(newLocale, i18n); // Передаємо i18n
      i18n.locale.value = newLocale;
    }
  }


  return {
    locale,
    locales,
    selectLocale,
    loadMessages
  };
});
