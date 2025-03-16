<template>
  <UTable
      :ui="{
        thead: 'bg-waterloo-500 h-[50px] text-white', // Червоний фон, білий текст
    }"
      :columns="columns"
      :data="data"
      :empty-state="{ label: 'No data' }"
      class="mt-4 flex-1"
  >
    <template #id-cell="{ row }">
      <div class="max-w-[50px]">
        {{ row.original.id }}
      </div>
    </template>
    <template #lang-cell="{ row }">
      <div class="max-w-[100px]">
        {{ getNameOfLang(row.original.lang) }}
      </div>
    </template>
    <template #code-cell="{ row }">
      <div class="w-[350px] break-words whitespace-pre-line flex items-center">

        <NuxtLink v-if="canEdit" :to="`/settings/translate_${row.original.code}`"
                  class="cursor-pointer underline hover:no-underline max-w-[300px]">
          {{ row.original.code }}
        </NuxtLink>
        <span v-else class="max-w-[300px]">
                {{ row.original.code }}
              </span>
        <PersonalUICopyBtn
            v-if="row.original.code"
            text-copy="t.copy.code"
            :value-copy="row.original.code"
        />
      </div>
    </template>
    <template #value-cell="{ row }">
      <div class="w-[350px] break-words whitespace-pre-line flex items-center">
        <div class="max-w-[300px]">{{ row.original.value }}</div>
        <PersonalUICopyBtn
            v-if="row.original.value"
            text-copy="t.copy.value"
            :value-copy="row.original.value"
        />
      </div>
    </template>
    <template #created_at-cell="{ row }">
      <div class="w-[150px]">
        <b>
          {{ row.original.createdDate.days }}
        </b>
        <p>
          {{ row.original.createdDate.hours }}
        </p>
      </div>
    </template>
    <template #updated_at-cell="{ row }">
      <div class="w-[150px]">
        <b>
          {{ row.original.updatedDate.days }}
        </b>
        <p>{{ row.original.updatedDate.hours }}</p>
      </div>
    </template>

    <!--    <template #operations-cell="{ row }">-->
    <!--      <div class="table__buttons border-l">-->
    <!--        <UButton-->
    <!--            v-if="canEdit"-->
    <!--            @click="emit('editTranslate', {id: row.original.id, value: row.original.value})"-->
    <!--            :title="$t('t.btn.title.edit')"-->
    <!--            color="gray"-->
    <!--            variant="ghost"-->
    <!--        >-->
    <!--          <UIcon :size="22" name="ep:edit"/>-->
    <!--        </UButton>-->
    <!--        <UButton-->
    <!--            @click="emit('delete-translate', row.original.id)"-->
    <!--            :title="$t('t.btn.title.delete')"-->
    <!--            color="gray"-->
    <!--            variant="ghost"-->
    <!--        >-->
    <!--          <UIcon :size="22" name="ep:delete"/>-->
    <!--        </UButton>-->
    <!--      </div>-->
    <!--    </template>-->
  </UTable>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: []
  },
  languages: {
    type: Array,
    default: []
  },
  canEdit: {
    type: Boolean,
    default: false
  }
})

import {useNuxtApp} from '#app';
import {h, resolveComponent} from 'vue'
const toast = useToast()
const {$loader} = useNuxtApp();
const {t, locale} = useI18n();
const emit = defineEmits(['delete-translate']);
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const getNameOfLang = (value) => {
  return props.languages.find(locale => locale.code === value)?.name
}

const columns = ref([
  {
    accessorKey: 'id',
    header: () => h('div', {class: 'text-left text-white'}, t('t.table.id')),
  },
  {
    accessorKey: 'lang',
    header: () => h('div', {class: 'text-left text-white'}, t('t.table.language')),
  },
  {
    accessorKey: 'code',
    header: () => h('div', {class: 'text-left text-white'}, t('t.table.code')),
  },
  {
    accessorKey: 'value',
    header: () => h('div', {class: 'text-left text-white'}, t('t.table.value')),
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', {class: 'text-left text-white'}, t('t.table.created_at')),
  },
  {
    accessorKey: 'updated_at',
    header: () => h('div', {class: 'text-left text-white'}, t('t.table.updated_at')),
  },
  {
    id: 'actions',
    cell: ({row}) => {
      return h(
          'div',
          {class: 'text-right cursor-pointer'},
          h(
              UDropdownMenu,
              {
                content: {
                  align: 'end'
                },
                items: getActionsItems(row)
              },
              () =>
                  h(UButton, {
                    icon: 'i-lucide-ellipsis-vertical',
                    color: 'neutral',
                    variant: 'ghost',
                    class: 'ml-auto'
                  })
          )
      )
    }
  }
])


const getActionsItems = (row) => {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      type: 'separator'
    },
    {
      label: 'Copy payment ID',
      onSelect() {
        navigator.clipboard.writeText(row.original.id)
        toast.add({
          title: 'Payment ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'View customer'
    },
    {
      label: 'View payment details'
    }
  ]
}
</script>





