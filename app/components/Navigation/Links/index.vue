<template>
  <UNavigationMenu
      orientation="vertical"
      :items="filteredLinks"
      class="data-[orientation=vertical]:w-full"
  />
</template>

<script setup>
defineProps({
  filteredLinks: {
    type: Array,
    default: []
  }
})
</script>




