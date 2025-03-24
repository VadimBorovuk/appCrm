<template>
  <TemplateDynamicPage :title="titleContent" >
    <template #content-dynamic>
      <TranslationFormChange
          type="edit"
      />
    </template>
  </TemplateDynamicPage>
</template>

<script setup>
const titleContent = ref('t.edit.translation.key')
useHead({
  title: useTranslatedHead(titleContent.value)
});
</script>
