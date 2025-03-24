<template>
  <UModal v-model:open="translateStore.isOpenCreateTranslate"
          :title="$t('t.settings.translations.add')"
  >
    <template #body>
      <UForm :validate="validateCreate"
             validate-on="submit"
             :state="translateStore.objCreateTranslation" class="space-y-4"
             @submit="emit('create-translation')">
        <UFormField name="lang" class="mb-3">
          <div class="flex items-center">
            <div class="min-w-[90px] max-w-[90px] break-words mr-2">
              {{ $t('t.filter.lang') }}
            </div>
            <USelectMenu
                class="w-full"
                searchable
                clear-search-on-close
                size="lg"
                v-model="translateStore.objCreateTranslation.lang"
                :items="languages"
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
                v-model.trim="translateStore.objCreateTranslation.code"
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
                v-model.trim="translateStore.objCreateTranslation.value"
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
  </UModal>
</template>

<script setup>
import ErrorRequired from "~/components/PersonalUI/ErrorRequired.vue";
import {useTranslateStore} from '~/stores/translateStore.js'
const translateStore = useTranslateStore()

defineProps({
  languages: {
    type: Array,
    default: []
  }
})

// validate form
const validateCreate = (state) => {
  const errors = []

  if (!state.lang) errors.push({name: 'lang', message: 't.label.error.lang'})
  if (!state.code) errors.push({name: 'code', message: 't.label.error.code'})
  if (!state.value) errors.push({name: 'value', message: 't.label.error.value'})

  return errors
}

const emit = defineEmits(['create-translation', 'close-modal-create'])

</script>
