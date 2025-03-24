import {useNuxtApp} from '#app';

export function useApiTranslate() {
  const config = useRuntimeConfig();
  const {$service} = useNuxtApp();

  const transGetByLang = (lang) => {
    return $service({
      url: `/api/translate-by-lang/${lang}/${config.public.CLIENT_APP_ID}`,
      method: 'get'
    });
  };

  const transGetListByCode = (code) => {
    return $service({
      url: `/api/translate/code/${code}/${config.public.CLIENT_APP_ID}`,
      method: 'get'
    })
  }

  const transUpdateByCode = (data) => {
    return $service({
      url: '/api/translate/update-by-code',
      method: 'put',
      data: data
    })
  }

  const langGet = () => {
    return $service({
      url: '/api/lang',
      method: 'get'
    })
  }

  const transGetList = (page, params) => {
    return $service({
      url: `/api/translate/list`,
      method: 'get',
      params: {page, ...params}
    })
  }
  const transCreate = (data) => {
    return $service({
      url: '/api/translate/create',
      method: 'post',
      data: data
    })
  }
  const transUpdate = (data) => {
    return $service({
      url: '/api/translate/update',
      method: 'put',
      data: data
    })
  }

  const translateDelete = (id) => {
    return $service({
      url: '/api/translate/delete',
      method: 'delete',
      data: {
        id: id
      }
    })
  }

  return {
    transGetByLang,
    transGetList,
    langGet,
    transCreate,
    transUpdate,
    transUpdateByCode,
    transGetListByCode,
    translateDelete
  }
}
