<template>
  <TemplateDynamicPage
      :title="titleContent"
      btnBackVisible
  >
    <template #content-dynamic>
      <TranslationFormChange
        type="create"
      />
    </template>
  </TemplateDynamicPage>
</template>


<script setup>
import {useTranslatedHead} from "~/composables/useTranslatedHead.js";

const titleContent = ref('t.settings.list.add_multiple')
useHead({
  title: useTranslatedHead(titleContent.value)
});
</script>
