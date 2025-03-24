<template>
  <div class="flex items-center">
    <div class="flex items-center border-r-2 mr-3 border-waterloo-300">
      <b class="mr-2">{{$t('t.label.show.count')}}</b>
      <USelect :model-value="limit"
               @update:model-value="emit('update:limit', $event)"
               :items="[10,20,50]" class="w-24 mr-3"/>
    </div>
    <div class="flex items-center">
      <b class="mr-2">{{$t('t.label.total.items')}}:</b>
      <span>{{total}}</span>
    </div>
  </div>

  <UPagination
      size="lg"
      :page="page"
      :items-per-page="pageCount"
      :total="total"
      @update:page="updateCurrentPage"
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
  },
  limit: {
    type: Number,
    default: 20
  }
})
const emit = defineEmits(["update:page", "update:limit"])

const updateCurrentPage = (newPage) => {
  emit("update:page", newPage)
}
</script>
