<template>
  <UDropdownMenu
      class="cursor-pointer"
      @update:open="emit('update-langs')"
      :items="items"
      :ui="{content: 'w-60'}"
  >
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


