<template>
  <UModal v-model:open="translateStore.isOpenEditTranslate"
          :title="$t('t.settings.translations.edit')"
  >
    <template #body>
      <UForm :validate="validateEdit"
             validate-on="submit"
             :state="translateStore.objEditTranslation" class="space-y-4"
             @submit="emit('edit-translation')">
        <UFormField name="value" class="mb-3">
          <div class="flex items-center">
            <div class="min-w-[90px] max-w-[90px] break-words mr-2">
              {{ $t('t.filter.value') }}
            </div>
            <UTextarea
                v-model.trim="translateStore.objEditTranslation.value"
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
                @click="emit('close-modal-edit')"
                description="t.btn.cancel"
            />
          </div>
          <div>
            <UButton
                size="lg"
                class="bg-waterloo-700 font-bold hover:bg-waterloo-600 dark:bg-waterloo-50 hover:dark:bg-waterloo-200 transition duration-300 ease-in-out cursor-pointer"
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
import {useTranslateStore} from "~/stores/translateStore.js"
const translateStore = useTranslateStore();
const validateEdit = (state) => {
  const errors = []
  if (!state.value) errors.push({name: 'value', message: 't.label.error.value'})
  return errors
}

const emit = defineEmits(['edit-translation', 'close-modal-edit'])
</script>
