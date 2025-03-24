<template>
<!--   @update:open="emit('update-langs')"-->
  <UDropdownMenu
      class="cursor-pointer"

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
</script>


