<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }}"
             @click="emit('update-langs')"
             :popper="{ placement: 'bottom-start' }">
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" class="border-gray-600 border-2"/>
    <!--        <UIcon name="subway:admin" />-->
    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <template v-if="item.to">
        <a :href="item.to" class="w-full flex items-center justify-between">
          <span>{{ item.label }}</span>
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto"/>
        </a>
      </template>
      <template v-else @click="item.click">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto"/>
      </template>
    </template>
  </UDropdown>
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

<!--"@nuxt/ui": "^2.21.0",-->
