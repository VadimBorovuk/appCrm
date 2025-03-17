<template>
  <UModal :open="visible"
          class="max-w-[800px]"
          @update:open="emit('cancel-click')"
          :title="$t('t.search.translate.title')">
    <template #body>
      <ul class="flex items-center">
        <li :class="classForTranslate()">Key</li>
        <li :class="classForTranslate()">Value</li>
        <li :class="classForTranslate()">Select</li>
      </ul>
      <ul>
        <template v-for="(language, idx) in langStore.dataLanguages">
          <li class="flex items-center">
            <div
                :title="$t('t.btn.copy')"
                :class="classForTranslate()"
                class="cursor-pointer"
                @click="copyValue(language.code)"
            >
              <span>{{ language.code }}</span>
            </div>
            <div v-if="language.status === 1" :class="classForTranslate()">
              <UInput
                  v-model="language.value"
                  style="text-align: center"
                  size="lg"
                  :placeholder="$t('t.filter.value')"
              />
              <Icon
                  class="cursor-pointer ml-2"
                  :size="20"
                  name="i-lucide-save"
                  @click="updateLangCode(language)"/>
            </div>
            <div :class="classForTranslate()" v-else>
                <span>{{ language.value }}</span
                ></div>

            <div :class="classForTranslate()">
              <Icon
                  class="cursor-pointer"
                  :size="20"
                  name="i-lucide-edit"
                  @click="handleCanEdit(language)"/>
            </div>
          </li>
        </template>
      </ul>
    </template>
  </UModal>
</template>

<script setup>
import {useLangStore} from "../../../stores/langStore.js";
import {useClipboard} from "../../../composables/useClipboard.js";
import {useShowNotivue} from "../../../composables/useNotivue.js";

defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
const i18n = useI18n();
const {$loader} = useNuxtApp();
const {showNotivue} = useShowNotivue();
const langStore = useLangStore()
const {copyToClipboard} = useClipboard();

const classForTranslate = () => {
  return 'flex items-center flex-1 border-waterloo-300 border-b-1 h-[40px] justify-center'
}

const copyValue = async (value) => {
  const success = await copyToClipboard(value);
  showNotivue(!success, 't.error.save.translate', 't.success.copy')
};

const handleCanEdit = (row) => {
  langStore.handleStatusForEdit(row)
}

const updateLangCode = async (row) => {
  await langStore.updateLanguageCode(row)
  clearCache()
}

const clearCache = () => {
  $loader.startLoadingPage()
  langStore.locales.forEach(locale =>{
    localStorage.removeItem(`nf_locale_${locale.code}`)
  })
  langStore.loadMessages(langStore.locale, i18n);
  setTimeout(() => {
    $loader.closeLoadingPage()
    showNotivue(false, 't.error.edit.translate', 't.success.edit.translate')
  }, 500)
}

const emit = defineEmits(['cancel-click', 'agree-click'])
</script>
