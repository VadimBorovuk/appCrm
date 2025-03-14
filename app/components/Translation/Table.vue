<template>
  <div class="table-container mb-6">
    <UTable
        :ui="{
        thead: 'bg-waterloo-500 h-[50px] text-white', // Червоний фон, білий текст
    }"
        :rows="data.items"
        :columns="columns"
        :empty-state="{ label: 'No data' }"
        class="mt-4 notifications-lists w-100"
    >
      <template #id-data="{ row }">
        <div class="w-[50px]">
          {{ row.id }}
        </div>
      </template>

      <template #lang-data="{ row }">
        <div class="w-[50px]">
          {{ row.lang }}
        </div>
      </template>

      <template #code-data="{ row }">
        <div class="w-[350px] break-words whitespace-pre-line flex">

          <NuxtLink v-if="canEdit" :to="`/settings/translate_${row.code}`"
                    class="cursor-pointer underline hover:no-underline">
            {{ row.code }}
          </NuxtLink>
          <span v-else>
            {{ row.code }}
          </span>
          <PersonalUICopyBtn
              v-if="row.code"
              text-copy="t.copy.code"
              :value-copy="row.code"
          />
        </div>
      </template>
      <template #value-data="{ row }">
        <div class="w-[400px] break-words whitespace-pre-line flex">
          <div class="max-w-[300px]">{{ row.value }}</div>
          <PersonalUICopyBtn
              v-if="row.value"
              text-copy="t.copy.value"
              :value-copy="row.value"
          />
        </div>
      </template>
      <template #created_at-data="{ row }">
        <div class="w-[200px]">
          {{ row.created_at }}
        </div>
      </template>

      <template #updated_at-data="{ row }">
        <div class="w-[200px]">
          {{ row.updated_at }}
        </div>
      </template>

      <template #operations-data="{ row }">
        <div class="table__buttons border-l">
          <UButton
              v-if="canEdit"
              @click="emit('editTranslate', {id: row.id, value: row.value})"
              :title="$t('t.btn.title.edit')"
              color="gray"
              variant="ghost"
          >
            <UIcon :size="22" name="ep:edit"/>
          </UButton>
          <UButton
              @click="emit('delete-translate', row.id)"
              :title="$t('t.btn.title.delete')"
              color="gray"
              variant="ghost"
          >
            <UIcon :size="22" name="ep:delete"/>
          </UButton>
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup>
import {useNuxtApp} from '#app';

const {$loader} = useNuxtApp();
const {t, locale} = useI18n();
const emit = defineEmits(['delete-translate'])

defineProps({
  data: {
    type: Object,
    default: {}
  },
  canEdit: {
    type: Boolean,
    default: false
  }
})

const columns = ref([
  {key: 'id', label: t('t.table.id'), class: 'w-[50px]'},
  {key: 'lang', label: t('t.table.language'), class: 'w-[50px]'},
  {key: 'code', label: t('t.table.code'), class: 'w-[200px] break-words'},
  {key: 'value', label: t('t.table.value'), class: 'w-[400px] break-words'},
  {key: 'created_at', label: t('t.table.created_at'), class: 'min-w-[200px]'},
  {key: 'updated_at', label: t('t.table.updated_at'), class: 'min-w-[200px]'},
  {
    key: 'operations',
    label: t('t.table.operations'),
    class: 'min-w-[140px]'
    // class: 'sticky right-0 bg-whiteLilac-700 z-10'
  },
]);

watch(() => locale.value, (newLocale) => {
  $loader.startLoadingPage()
  columns.value = [
    {key: 'id', label: t('t.table.id'), class: 'min-w-[50px]'},
    {key: 'lang', label: t('t.table.language'), class: 'min-w-[50px]'},
    {key: 'code', label: t('t.table.code'), class: 'w-[200px] break-words'},
    {key: 'value', label: t('t.table.value'), class: 'w-[400px] break-words'},
    {key: 'created_at', label: t('t.table.created_at'), class: 'min-w-[200px]'},
    {key: 'updated_at', label: t('t.table.updated_at'), class: 'min-w-[200px]'},
    {
      key: 'operations',
      label: t('t.table.operations'),
      class: 'min-w-[140px]'
      // class: 'sticky right-0 bg-whiteLilac-700 z-10'
    },
  ]
  setTimeout(() => {
    $loader.closeLoadingPage()
  }, 500)

})
</script>
