<template>
  <p v-if="error" class="text-red-500 text-sm mt-1 pl-[100px]">{{ $t(error) }}</p>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: ""
  }
})
</script>
