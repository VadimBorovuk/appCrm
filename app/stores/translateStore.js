import {ref} from "vue";
import {defineStore} from "pinia";
import {useLangStore} from "~/stores/langStore.js";
import {useApiTranslate} from "~/api/translate.js";
import { useFormatDateWithTimezone} from "~/composables/useDateFormat.js"

export const useTranslateStore = defineStore('Translation', () => {

  // variables for translation page
  const {$loader} = useNuxtApp();
  const route = useRoute()
  const config = useRuntimeConfig();
  const {locale} = useLangStore()
  const {
    transGetList,
    transCreate,
    transUpdate,
    transGetListByCode,
    transUpdateByCode,
    translateDelete
  } = useApiTranslate();

  const page = ref(1);
  const limit = ref(20);

  const translateValue = ref('');
  const dataLanguages = ref([]);

  const isOpenCreateTranslate = ref(false);
  const isOpenEditTranslate = ref(false);
  const isOpenSearchTranslate = ref(false);

  const currentObjLanguages = ref({
    locales: {}
  })

  const filledDataTranslation = ref({
    code: "",
    app_id: config.public.CLIENT_APP_ID,
    items: {},
  });

  const objCreateTranslation = ref({
    lang: null,
    code: "",
    value: "",
    app_id: config.public.CLIENT_APP_ID
  })

  const findKeyCreateTranslation = ref({
    lang: null,
    code: "",
    value: "",
    app_id: config.public.CLIENT_APP_ID
  })

  const objEditTranslation = ref({
    value: "",
    id: null
  })

  const translateData = ref({
    items: [],
    limit: null,
    total_items: null
  })

  const filtersTranslate = ref({
    limit: limit.value,
    order: 'id',
    by: 'DESC',
    app_id: config.public.CLIENT_APP_ID
  })

  // variables for translation form page (create & edit)
  const filledTranslates = ref({
    code: route.params.code || "",
    app_id: config.public.CLIENT_APP_ID,
    items: {}
  })

  const handleStatusForEdit = (row) => {
    if (row.status === 0) {
      row.status = 1
    } else {
      row.status = 0
    }
  }
  const applyParamToTranslation = (body) =>{
    findKeyCreateTranslation.value = {
      lang: body.lang,
      code: body.code,
      value: body.value,
      app_id: config.public.CLIENT_APP_ID
    }
  }

  const handleSearchModal = (value) => {
    isOpenSearchTranslate.value = value
  }
  const setTranslateValue = (searchValue) => {
    translateValue.value = searchValue
  }

  const clearFilledTranslates = () => {
    filledTranslates.value = {
      code: route.params.code || "",
      app_id: config.public.CLIENT_APP_ID,
      items: {}
    }
  }

  const setPageOnFirst = () => {
    page.value = 1
  }
  // methods for translation form page (create & edit)

  const openEditModalTranslate = ({id, value}) => {
    isOpenEditTranslate.value = true
    objEditTranslation.value = {
      id,
      value
    }
  }

  const updateLanguageCode = async (row) => {
    try {
      filledDataTranslation.value = {
        app_id: filledDataTranslation.value.app_id,
        code: row.code,
        items: {
          [`${locale}`]: row.value
        }
      }
      await transUpdateByCode(filledDataTranslation.value)
      isOpenSearchTranslate.value = false
    } catch (error) {
      return error.response.data
    }
  }

  const fetchListTranslateByCode = async (code) => {
    try {
      filledTranslates.value.code = code
      const response = await transGetListByCode(code)
      response.data.data.forEach((item) => {
        filledTranslates.value.items[item.lang] = item.value
      })
    } catch (error) {
      return error
    }
  }

  const loadLanguagesFromLS = () => {
    if (process.client) {
      currentObjLanguages.value = JSON.parse(localStorage.getItem(`nf_locale_${locale}`))
    }
    let arrData = []
    if (currentObjLanguages.value && currentObjLanguages.value.locales){
      for (var lang in currentObjLanguages.value.locales) {
        if (currentObjLanguages.value.locales[lang] === translateValue.value) {
          arrData.push({
            status: 0,
            new_text: "",
            code: `${lang}`,
            lang: locale,
            value: currentObjLanguages.value.locales[lang]
          });
        }
      }
      dataLanguages.value = arrData
    }

  }

  const saveTranslation = async () => {
    try {
      await transUpdateByCode(filledTranslates.value)
    } catch (error) {
      return error.response.data
    }
  }


  // methods for translation page
  const resetFieldsCreateTranslation = () => {
    isOpenCreateTranslate.value = true;
    objCreateTranslation.value = {
      lang: null,
      code: null,
      value: null,
      app_id: config.public.CLIENT_APP_ID
    }
  }
  const closeModalTranslation = () => {
    isOpenCreateTranslate.value = false;
  }
  const closeModalTranslationEdit = () => {
    isOpenEditTranslate.value = false;
  }

  const resetFilter = async () => {
    page.value = 1
    filtersTranslate.value = {
      limit: limit.value,
      order: 'id',
      by: 'DESC',
      app_id: config.public.CLIENT_APP_ID,
      lang: null
    }
    await fetchTranslates(1, filtersTranslate.value)
  }

  const fetchTranslates = async (page, params) => {
    $loader.startLoadingPage()
    try {
      const response = await transGetList(page, params)

      const {items, limit, total_items} = response.data.data
      translateData.value = {
        items: items.map(item => ({
          ...item,
          created_at: useFormatDateWithTimezone(item.created_at).label,
          updated_at: useFormatDateWithTimezone(item.updated_at).label,
          createdDate: {
            days: useFormatDateWithTimezone(item.created_at).days,
            hours: useFormatDateWithTimezone(item.created_at).hours,
          },
          updatedDate: {
            days: useFormatDateWithTimezone(item.updated_at).days,
            hours: useFormatDateWithTimezone(item.updated_at).hours,
          }
          /*for convert to timezone*/
        })),
        limit,
        total_items
      }
    } catch (error) {
      return error
    } finally {
      $loader.closeLoadingPage()
    }
  }

  const createTranslate = async () => {
    try {
      await transCreate(objCreateTranslation.value)
      closeModalTranslation()
    } catch (error) {
      return error.response.data
    }
  }

  const createFindKeyTranslate = async () => {
    try {
      await transCreate(findKeyCreateTranslation.value)
    } catch (error) {
      return error.response.data
    }
  }
  const editTranslate = async () => {
    try {
      await transUpdate(objEditTranslation.value)
      closeModalTranslationEdit()
    } catch (error) {
      return error.response.data
    }
  }
  // translateDelete
  const deleteTranslationById = async (id) => {
    try {
      await translateDelete(id)
    } catch (error) {
      return error.response.data
    }
  }

  return {
    page,
    limit,
    isOpenCreateTranslate,
    isOpenEditTranslate,
    objCreateTranslation,
    findKeyCreateTranslation,
    translateData,
    filtersTranslate,
    filledTranslates,
    objEditTranslation,
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
    applyParamToTranslation,
    createFindKeyTranslate,
    resetFilter,
    fetchTranslates,
    createTranslate,
    closeModalTranslation,
    resetFieldsCreateTranslation,
    fetchListTranslateByCode,
    saveTranslation,
    clearFilledTranslates,
    deleteTranslationById,
    openEditModalTranslate,
    closeModalTranslationEdit,
    editTranslate,
    setPageOnFirst
  }
})
