<template>
  <UForm :validate="validate" :state="translateStore.filledTranslates" class="space-y-4 max-w-[600px] mx-auto py-5"
         @submit="saveTranslations">

    <UFormGroup name="code">
      <div class="relative">
        <UInput
            v-model.trim="translateStore.filledTranslates.code"
            size="lg"
            :placeholder="$t('t.filter.code')"
            class="pl-[100px]"
        />
        <div class="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 w-[90px] break-words">
          {{ $t('t.filter.code') }}
        </div>
      </div>
    </UFormGroup>

    <UDivider class="my-4"/>

    <template v-for="(item, idx) in langStore.locales">
      <UFormGroup>
        <div class="relative">
          <UInput
              v-model.trim="translateStore.filledTranslates.items[item.code]"
              size="lg"
              :placeholder="$t('t.table.value')"
              class="pl-[100px]"
          />
          <div class="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 w-[90px] break-words">
            {{ item.name }}
          </div>
        </div>
      </UFormGroup>
    </template>

    <UDivider class="my-4"/>

    <div class="flex items-center justify-center">
      <UButton size="lg"
               class="bg-waterloo-700 hover:bg-waterloo-600 transition duration-300 ease-in-out"
               type="submit">
        {{ $t('t.btn.save') }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup>


import {useLangStore} from "../../../stores/langStore.js";
import {useTranslateStore} from "../../../stores/translateStore.js";

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
  if (!state.code) errors.push({path: 'code', message: 'Required code'})
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

