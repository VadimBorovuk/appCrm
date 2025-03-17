import {ref} from "vue";
import {defineStore} from 'pinia'
import {useApiTranslate} from "../api/translate.js";
import {useFormatDateWithTimezone} from "../composables/useDateFormat.js";

export const useTranslateStore = defineStore('Translation', () => {

  // variables for translation page
  const {$loader} = useNuxtApp();
  const route = useRoute()
  const config = useRuntimeConfig();
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

  const isOpenCreateTranslate = ref(false);
  const isOpenEditTranslate = ref(false);

  const objCreateTranslation = ref({
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
    translateData,
    filtersTranslate,
    filledTranslates,
    objEditTranslation,
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
