<template>
  <div class="flex items-center justify-between h-[70px] border-b-[1.1px] border-[#e2e8f0] mb-3">
    <div class="w-[320px] flex items-center h-full">
      <client-only>
        <NavigationDropDown
            :email="userData.user_info.email"
            :items="listDropCrm"
        />
        <div class="flex items-center justify-center h-full px-3 flex-1">
          <p class="text-[12px] text-[#929292]"> {{ $t('t.nav.agent.name') }} ⏤ {{ userData.user_info.first_name }}
            {{ userData.user_info.second_name }} </p>
        </div>
      </client-only>
    </div>
  </div>
</template>


<script setup>
import {useI18n} from 'vue-i18n';
import {useCookie} from 'nuxt/app';
import {useLangStore} from "~/stores/langStore.js";
import {useUserStore} from "~/stores/userStore.js";

const {$loader} = useNuxtApp();
const config = useRuntimeConfig();
const cc_locale = useCookie('cc_locale');
const i18n = useI18n();
const {locale, t} = i18n;
const {selectLocale, locales} = useLangStore();
const {userData, departments} = useUserStore();


const getIconOfLang = (code) => {
  switch (code) {
    case "en":
      return 'flag:um-4x3'
    case "uk":
      return 'flag:ua-4x3'
    case "pt":
      return 'flag:pt-4x3'
    case "es":
      return 'flag:es-4x3'
    case "ru":
      return 'flag:xx-4x3'
    default:
      return ""
  }
}

const getNameOfLang = (value, status) => {
  if (status) {
    return locales.find(locale => locale.code === value)?.name
  } else {
    return locales.find(locale => locale.name === value)?.code
  }
}

const listDropCrm = computed(() => [
  [{
    label: t('t.label.drop.languages'),
    slot: 'languages',
    disabled: true
  }],
  ...[locales.map((lang) => ({
    label: getNameOfLang(lang.code, true),
    icon: getIconOfLang(lang.code),
    disabled: locale.value === lang.code,
    class: locale.value === lang.code ? 'bg-waterloo-500 text-white flex justify-center items-center py-1 my-2 cursor-pointer' : 'cursor-pointer bg-white text-black py-1 flex justify-center items-center hover:bg-waterloo-50 my-2',
    onSelect() {
      changeLang(lang.code);
    }
  }))],
  [{
    label: t('t.label.drop.departments'),
    slot: 'departments',
    disabled: true
  }],
  ...[departments.map((department) => ({
    label: t(`t.department.${department.code}`),
    icon: department.icon,
    to: `${config.public.CLIENT_APP_PATH}${department.path}`
  }))],
  [{
    label: t('t.label.drop.logout'),
    icon: 'ic:twotone-log-out',
    to: config.public.CLIENT_APP_PATH
  }]
])


const changeLang = async (value) => {
  $loader.startLoadingPage()
  await selectLocale(value, i18n); // Передаємо i18n
  cc_locale.value = value;
  setTimeout(() => {
    $loader.closeLoadingPage()
  }, 500)
};
</script>



