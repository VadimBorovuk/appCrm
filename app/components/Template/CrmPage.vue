<template>
  <client-only>
    <div>
      <!-- Заголовок сторінки -->
      <div class="flex justify-between items-center">
        <PersonalUITitle :title="title" :icon="icon"/>
        <slot name="actions"/>
      </div>
      <USeparator class="my-2 "/>
      <div class="bg-white dark:bg-waterloo-800 w-full rounded-lg p-4 mt-4">
        <!-- Фільтр -->
        <slot name="filter"/>

        <USeparator class="my-6"/>

        <!-- Таблиця -->
        <slot name="table"/>

        <USeparator class="mb-8"/>

        <!-- Пагінація -->
        <slot name="pagination"/>

      </div>
      <slot name="modals"/>
    </div>
  </client-only>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  }
});
</script>

