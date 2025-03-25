<template>
  <PersonalUITitle :title="titleContent" icon="mdi:home-circle"/>
  <USeparator class="mt-2"/>
</template>

<script setup>
import {useTranslatedHead} from "~/composables/useTranslatedHead.js";

const titleContent = ref('t.main.page')
useHead({
  title: useTranslatedHead(titleContent.value)
});
</script>
