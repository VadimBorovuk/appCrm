<template>
  <client-only>
    <div>
      <!-- Заголовок сторінки -->
      <div class="flex justify-between items-center">
        <PersonalUITitle :title="title" btn-back-visible/>
        <slot name="actions"/>
      </div>
      <UDivider class="my-2"/>
      <div class="bg-white w-100 rounded-lg p-4 mt-4">
        <slot name="content-dynamic"/>
      </div>
    </div>
  </client-only>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: ""
  }
});
</script>

