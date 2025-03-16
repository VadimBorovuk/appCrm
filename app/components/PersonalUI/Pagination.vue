<template>
  <UPagination
      size="xl"
      :page="page"
      :items-per-page="pageCount"
      :total="total"
      @update:page="updatePage"
      color="neutral" variant="outline"
      active-color="neutral"
      show-edges
  />
</template>
<script setup>

defineProps({
  pageCount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(["update:page"])

const updatePage = (newPage) => {
  emit("update:page", newPage)
}

</script>
