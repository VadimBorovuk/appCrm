<template>
  <UApp>
    <Notivue v-slot="item">
      <Notification :item="item"/>
    </Notivue>
    <LoadingView/>
    <main class="h-full">
      <div class="page-holder h-full flex">
        <SidebarContent/>
        <div class="flex-1 p-5">
          <NuxtPage/>
        </div>
      </div>
    </main>

    <PersonalUIModalSearchTranslate
        :visible="translateStore.isOpenSearchTranslate"
        :textCopied="textCopied"
        @cancel-click="closeModal"
        @agree-click="saveTranslate"
    />
  </UApp>
</template>

<script setup>
import {useTranslateStore} from '~/stores/translateStore.js';

const {$selectedText} = useNuxtApp();
const translateStore = useTranslateStore();
const textCopied = ref('');

const closeModal = () => {
  translateStore.handleSearchModal(false)
}
const saveTranslate = () => {
  translateStore.handleSearchModal(false)
}
watch($selectedText, (newText) => {
  if (newText) {
    textCopied.value = newText
    translateStore.handleSearchModal(true)
    translateStore.setTranslateValue(newText)
    translateStore.loadLanguagesFromLS()
    // close all modals
    translateStore.closeModalTranslation()
    translateStore.closeModalTranslationEdit()
  }
});
</script>
