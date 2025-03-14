import {defineStore} from 'pinia'

import {useRouter} from "#vue-router";
import {useGenerateRoute} from "../api/route.js";

export const useRouteGenerateStore = defineStore('generateRoute', () => {
  const {$loader} = useNuxtApp();
  const router = useRouter();
  const {saveRoutes, getRoutes} = useGenerateRoute();
  const currentRoutes = ref([])
  const generatedRouters = ref([])

  const setCurrentRoutes = () => {
    currentRoutes.value = router.options.routes.map(r => ({
      name: r.name,
      path: r.path
    }))
  }

  const saveRoutesFunc = async () => {
    $loader.startLoadingPage()
    try {
      await saveRoutes(JSON.stringify(currentRoutes.value))
      await getRoutesFunc()
    } catch (error) {
      return error.response.data
    } finally {
      $loader.closeLoadingPage()
    }
  }

  const getRoutesFunc = async () => {
    $loader.startLoadingPage()
    try {
      const response = await getRoutes()
      generatedRouters.value = response.data.data
    } catch (error) {
      return error.response.data
    } finally {
      $loader.closeLoadingPage()
    }
  }

  return {
    currentRoutes,
    generatedRouters,
    setCurrentRoutes,
    saveRoutesFunc,
    getRoutesFunc
  }
})
