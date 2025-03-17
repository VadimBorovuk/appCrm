import {defineStore} from 'pinia';
import {useCookie} from 'nuxt/app';
import {useApiTranslate} from "../api/translate.js"; // Додано імпорт useCookie

export const useLangStore = defineStore('lang', () => {
  const config = useRuntimeConfig();
  const locale = useCookie('cc_locale', {
    default: () => {
      return process.server ? 'en' : (document.cookie.includes('cc_locale') ? document.cookie.match(/cc_locale=([^;]*)/)?.[1] : 'en');
    },
    maxAge: 31536000
  });

  const {
    transUpdateByCode
  } = useApiTranslate();


  const translateValue = ref('');
  const isOpenSearchTranslate = ref(false);
  const dataLanguages = ref([]);
  const currentObjLanguages = ref({})

  const filledDataTranslation = ref({
    code: "",
    app_id: config.public.CLIENT_APP_ID,
    items: {},
  });

  const loadLanguagesFromLS = () => {
    if (process.client) {
      currentObjLanguages.value = JSON.parse(localStorage.getItem(`nf_locale_${locale.value}`))
    }
    let arrData = []
    for (var lang in currentObjLanguages.value.locales) {
      if (currentObjLanguages.value.locales[lang] === translateValue.value) {
        arrData.push({
          status: 0,
          new_text: "",
          code: `${lang}`,
          value: currentObjLanguages.value.locales[lang]
        });
      }
    }
    dataLanguages.value = arrData
  }


  const handleStatusForEdit = (row) => {
    if (row.status === 0) {
      row.status = 1
    } else {
      row.status = 0
    }
  }

  const handleSearchModal = (value) => {
    isOpenSearchTranslate.value = value
  }
  const setTranslateValue = (searchValue) => {
    translateValue.value = searchValue
  }

  const locales = ref([
    {code: 'en', name: 'English'},
    {code: 'uk', name: 'Українська'},
    {code: 'pt', name: 'Portuguese'},
    {code: 'es', name: 'Spanish'},
    {code: 'ru', name: 'Русский'}
  ]);

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
      console.error("Помилка завантаження перекладів:", error);
    }
  }

  async function selectLocale(newLocale, i18n) { // Додано параметр i18n
    if (locale.value !== newLocale) {
      locale.value = newLocale;
      await loadMessages(newLocale, i18n); // Передаємо i18n
      i18n.locale.value = newLocale;
    }
  }

  const updateLanguageCode = async (row) => {
    try {
      filledDataTranslation.value = {
        app_id: filledDataTranslation.value.app_id,
        code: row.code,
        items: {
          [`${locale.value}`]: row.value
        }
      }
      await transUpdateByCode(filledDataTranslation.value)
      isOpenSearchTranslate.value = false

      //
      //
      // this.filledTrans.code = this.selectCode[0];
      // this.filledTrans.items[this.localeLang] = this.totalValueCode;
      // this.clearCache();
    } catch (error) {
      return error.response.data
    }
  }


  return {
    locale,
    locales,
    isOpenSearchTranslate,
    translateValue,
    filledDataTranslation,
    currentObjLanguages,
    dataLanguages,
    updateLanguageCode,
    loadLanguagesFromLS,
    handleStatusForEdit,
    setTranslateValue,
    handleSearchModal,
    selectLocale,
    loadMessages
  };
});
