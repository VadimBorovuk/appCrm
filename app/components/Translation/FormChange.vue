<template>
  <UForm :validate="validate" :state="translateStore.filledTranslates" class="space-y-4 max-w-[600px] mx-auto py-5"
         @submit="saveTranslations">

    <UFormField name="code">
      <div class="flex items-center">
        <div class="min-w-[90px] max-w-[90px] break-words mr-2">
          {{ $t('t.filter.code') }}
        </div>
        <UInput
            class="w-full"
            v-model.trim="translateStore.filledTranslates.code"
            size="lg"
            :placeholder="$t('t.filter.code')"
        />
      </div>
      <template #error="{ error }">
        <ErrorRequired :error="error"/>
      </template>
    </UFormField>

    <USeparator class="my-4"/>

    <template v-for="(item, idx) in langStore.locales">
      <UFormField>
        <div class="flex items-center">
          <div class="min-w-[90px] max-w-[90px] break-words mr-2">
            {{ item.name }}
          </div>
          <UInput
              class="w-full"
              v-model.trim="translateStore.filledTranslates.items[item.code]"
              size="lg"
              :placeholder="$t('t.table.value')"
          />
        </div>
      </UFormField>
    </template>

    <USeparator class="my-4"/>

    <div class="flex items-center justify-center">
      <UButton size="lg"
               class="bg-waterloo-700 font-bold hover:bg-waterloo-600 dark:bg-waterloo-50 hover:dark:bg-waterloo-200 transition duration-300 ease-in-out cursor-pointer"
               type="submit">
        {{ $t('t.btn.save') }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup>
import ErrorRequired from "~/components/PersonalUI/ErrorRequired.vue";
import {useTranslateStore} from "~/stores/translateStore.js"
import {useLangStore} from "~/stores/langStore.js"
defineProps({
  type: {
    type: String,
    default: 'create'
  }
})

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const translateStore = useTranslateStore()
const langStore = useLangStore();

const validate = (state) => {
  const errors = []
  if (!state.code) errors.push({name: 'code', message: 't.label.error.code'})
  return errors
}


const getTranslates = async (code) => {
  const error = await translateStore.fetchListTranslateByCode(code)
  if (error) {
    push.error({
      title: error.message,
      duration: 2000,
      position: 'top-right'
    })
  }
}

const saveTranslations = async () => {
  const error = await translateStore.saveTranslation()
  if (error) {
    push.error({
      title: error.message,
      duration: 2000,
      position: 'top-right'
    })
  } else {
    push.success({
      title: t('t.success.save.translations'),
      duration: 2000,
      position: 'top-right'
    })
    router.push('/settings/translations')
  }
}


onMounted(() => {
  translateStore.clearFilledTranslates()
  if (route.params.code) {
    getTranslates(route.params.code)
  }
})
</script>

