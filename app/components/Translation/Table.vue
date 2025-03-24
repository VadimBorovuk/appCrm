<template>
  <UTable
      v-model:column-pinning="columnPinning"
      :ui="{
        thead: 'bg-waterloo-500 h-[50px] text-white',
    }"
      :columns="columns"
      :data="data"
      :empty-state="{ label: 'No data' }"
      class="mt-4 flex-1"
  >
    <template #id-cell="{ row }">
      <div class="w-[80px]">
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
          {{ row.original.code ? row.original.code : '' }}
        </NuxtLink>
        <span
            v-else class="max-w-[300px]">
            {{ row.original.code ? row.original.code : '' }}
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
        <div class="max-w-[300px]">{{ row.original.value ? row.original.value : '-' }}</div>
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
  </UTable>
</template>

<script setup>
import {h, resolveComponent} from 'vue';

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
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const {t} = useI18n();
const emit = defineEmits(['delete-translate', 'edit-translate']);
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const getNameOfLang = (value) => {
  return props.languages.find(locale => locale.code === value)?.name
}

// for pinned col
const columnPinning = ref({
  left: [''],
  right: ['actions']
})

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

// for actions dropDown
const getActionsItems = (row) => {
  return [
    {
      type: 'label',
      label: t('t.table.actions'),
      visible: true
    }, {
      type: 'separator',
      visible: props.canEdit
    },
    {
      class: 'cursor-pointer',
      label: t('t.actions.edit'),
      onSelect() {
        emit('edit-translate', {id: row.original.id, value: row.original.value})
      },
      icon: 'i-lucide-edit',
      visible: props.canEdit
    },
    {
      type: 'separator',
      visible: props.canDelete,
    },
    {
      class: 'cursor-pointer',
      label: t('t.actions.delete'),
      visible: props.canDelete,
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        emit('delete-translate', row.original.id)
      },
    },
  ].filter(item => Boolean(item.visible))
}
</script>





