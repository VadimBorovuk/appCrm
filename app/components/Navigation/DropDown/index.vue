<template>
  <UDropdownMenu
      class="cursor-pointer"
      @update:open="emit('update-langs')"
      :items="items"
      :ui="{content: 'w-60'}"
  >
    <template #account="{ item }">
      <div class="text-left">
        <p>
          {{$t('t.label.signin')}}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ email }}
        </p>
      </div>
    </template>
    <UButton icon="i-lucide-menu" color="neutral" variant="outline"/>
  </UDropdownMenu>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: []
  },
  email: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['update-langs'])
</script>


