<template>
  <UModal :open="visible"
          :class="!!translateStore.dataLanguages.length ? 'max-w-[800px]': 'max-w-[500px]'"
          @update:open="emit('cancel-click')"
          :title="$t('t.search.translate.title')">
    <template #body>
      <!--      for update exist translation-->
      <template v-if="!!translateStore.dataLanguages.length">
        <ul class="flex items-center">
          <li class="flex-5" :class="classForTranslate()">Key</li>
          <li class="flex-1" :class="classForTranslate()">Lang</li>
          <li class="flex-5" :class="classForTranslate()">Value</li>
          <li class="flex-1" :class="classForTranslate()">Select</li>
        </ul>
        <ul>
          <template v-for="(language, idx) in translateStore.dataLanguages">
            <li :class="classForTranslate()">
              <div
                  class="cursor-pointer flex flex-5 items-center justify-center"
              >
                <span class="max-w-[200px] break-words">{{ language.code }}</span>
                <PersonalUICopyBtn
                    v-if="language.code"
                    text-copy="t.copy.code"
                    :value-copy="language.code"
                />
              </div>
              <div
                  class="flex-1 flex items-center justify-center"
              >
                <span>{{ language.lang }}</span>
              </div>

              <div v-if="language.status === 1" class="flex flex-5 items-center justify-center">
                <UInput
                    v-model="language.value"
                    style="text-align: center"
                    class="w-full"
                    size="lg"
                    :placeholder="$t('t.filter.value')"
                />
                <Icon
                    class="cursor-pointer ml-2"
                    :size="20"
                    name="i-lucide-save"
                    @click="updateLangCode(language)"/>
              </div>
              <div v-else class="flex flex-5 items-center justify-center">
                <span>{{ language.value }}</span
                ></div>

              <div class="flex flex-1 items-center justify-center">
                <Icon
                    class="cursor-pointer"
                    :size="20"
                    :name="language.status === 1 ? 'line-md:menu-to-close-alt-transition' :'i-lucide-edit'"
                    @click="handleCanEdit(language)"/>
              </div>
            </li>
          </template>
        </ul>
      </template>

      <!--      for create translation if not have -->
      <template v-else>
        <UForm :validate="validateCreate"
               validate-on="submit"
               :state="translateStore.findKeyCreateTranslation" class="space-y-4"
               @submit="saveCreateFindKeyTranslate">
          <UFormField name="lang" class="mb-3">
            <div class="flex items-center">
              <div class="min-w-[90px] max-w-[90px] break-words mr-2">
                {{ $t('t.filter.lang') }}
              </div>
              <USelectMenu
                  disabled
                  class="w-full"
                  searchable
                  clear-search-on-close
                  size="lg"
                  v-model="translateStore.findKeyCreateTranslation.lang"
                  :items="langStore.locales"
                  value-key="code"
                  label-key="name"
                  :search-input="{
                      placeholder: $t('t.filter.lang'),
                      icon: 'i-lucide-search'
                    }"
                  :placeholder="$t('t.filter.lang')"
              />
            </div>
            <template #error="{ error }">
              <ErrorRequired :error="error"/>
            </template>
          </UFormField>

          <UFormField name="code" class="mb-3">
            <div class="flex items-center">
              <div class="min-w-[90px] max-w-[90px] break-words mr-2">
                {{ $t('t.filter.code') }}
              </div>
              <UInput
                  v-model.trim="translateStore.findKeyCreateTranslation.code"
                  size="lg"
                  class="w-full"
                  :placeholder="$t('t.filter.code')"/>
            </div>
            <template #error="{ error }">
              <ErrorRequired :error="error"/>
            </template>
          </UFormField>

          <UFormField name="value" class="mb-3">
            <div class="flex items-center">
              <div class="min-w-[90px] max-w-[90px] break-words mr-2">
                {{ $t('t.filter.value') }}
              </div>
              <UInput
                  v-model.trim="translateStore.findKeyCreateTranslation.value"
                  size="lg"
                  class="w-full"
                  :placeholder="$t('t.filter.value')"/>
            </div>
            <template #error="{ error }">
              <ErrorRequired :error="error"/>
            </template>
          </UFormField>

          <div class="flex justify-end items-center">
            <div class="mr-3">
              <PersonalUIButton
                  @click="emit('close-modal-create')"
                  description="t.btn.cancel"
              />
            </div>
            <div>
              <UButton
                  size="lg"
                  class="bg-waterloo-700 hover:bg-waterloo-600 transition duration-300 ease-in-out cursor-pointer"
                  type="submit">
                {{ $t('t.btn.save') }}
              </UButton>
            </div>
          </div>
        </UForm>
      </template>
    </template>
  </UModal>
</template>

<script setup>

import ErrorRequired from "../PersonalUI/ErrorRequired.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  textCopied: {
    type: String,
    default: ""
  }
})
const i18n = useI18n();
const {$loader} = useNuxtApp();
const {showNotivue} = useShowNotivue();
const langStore = useLangStore();
const translateStore = useTranslateStore();

// validate form
const validateCreate = (state) => {
  const errors = []

  if (!state.lang) errors.push({name: 'lang', message: 't.label.error.lang'})
  if (!state.code) errors.push({name: 'code', message: 't.label.error.code'})
  if (!state.value) errors.push({name: 'value', message: 't.label.error.value'})

  return errors
}
const clearCache = () => {
  $loader.startLoadingPage()
  langStore.locales.forEach(locale => {
    localStorage.removeItem(`nf_locale_${locale.code}`)
  })
  langStore.loadMessages(langStore.locale, i18n);
  setTimeout(() => {
    $loader.closeLoadingPage()
    showNotivue(false, 't.error.update.translate', 't.success.update.translate')
  }, 500)
}

const classForTranslate = () => {
  return 'flex items-center border-[#e2e8f0] border-b-1 justify-center py-2 min-h-[54px]'
}

const handleCanEdit = (row) => {
  translateStore.handleStatusForEdit(row)
}

const updateLangCode = async (row) => {
  await translateStore.updateLanguageCode(row)
  clearCache()
}

const saveCreateFindKeyTranslate = async () => {
  await translateStore.createFindKeyTranslate()
  clearCache()
  translateStore.handleSearchModal(false)
}


watch(() => translateStore.isOpenSearchTranslate, (newValue) => {
  if (!translateStore.dataLanguages.length) {
    translateStore.applyParamToTranslation({
      lang: langStore.locale,
      code: props.textCopied,
      value: ""
    })
  }
}, {deep: true})


const emit = defineEmits(['cancel-click', 'agree-click'])
</script>
