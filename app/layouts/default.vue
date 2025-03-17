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
        :visible="langStore.isOpenSearchTranslate"
        @cancel-click="closeModal"
        @agree-click="saveTranslate"
    />
  </UApp>
</template>

<script setup>
import {useLangStore} from "../../stores/langStore.js";

const {$selectedText} = useNuxtApp();
const langStore = useLangStore()

const closeModal = () => {
  langStore.handleSearchModal(false)
}
const saveTranslate = () => {
  langStore.handleSearchModal(false)
}
watch($selectedText, (newText) => {
  if (newText) {
    langStore.handleSearchModal(true)
    langStore.setTranslateValue(newText)
    langStore.loadLanguagesFromLS()
    // showGenerateResult.value = true;
    // selectCode.value = [];
    // dataLangs.value = [];
    //
    // const objlang = JSON.parse(localStorage.getItem(`crm_locale_${locale.value}`));
    // for (const lang in objlang.locales) {
    //   if (objlang.locales[lang] === newText) {
    //     dataLangs.value.push({
    //       status: 0,
    //       new_text: '',
    //       [lang]: objlang.locales[lang],
    //     });
    //   }
    // }
  }
});
</script>



