<template>
  <TemplateCrmPage
      title="t.settings.translations"
      icon="mdi:google-translate"
  >
    <!-- actions -->
    <template #actions>
      <div class="flex items-center">
        <div class="ml-3">
          <PersonalUIButton
              :visible="actionCreateTranslate"
              icon="ep:circle-plus"
              @click="openTranslationsModal"
              active
              description="t.settings.list.add"
          />
        </div>

        <div class="ml-3">
          <PersonalUIButton
              :visible="actionCreateTranslates"
              icon="ep:circle-plus"
              @click="goToCreateTranslations"
              active
              description="t.settings.list.add_multiple"
          />
        </div>
        <div class="ml-3">
          <PersonalUIButton
              :visible="actionClearCache"
              icon="ep:delete-filled"
              @click="clearCache"
              active
              description="t.settings.list.clearCache"
          />
        </div>
      </div>
    </template>

    <!-- filter -->
    <template #filter>
      <TranslationFilter
          @active-filter="filterList"
          @reset-filter="resetFilterList"
          :filters="translateStore.filtersTranslate"
          :languages="langStore.locales"
      />
    </template>

    <!-- table -->

    <template #table>
      <div class="table-ui"
           v-if="translateStore.translateData && !!translateStore.translateData.items.length">
        <TranslationTable
            @delete-translate="deleteTranslate"
            @edit-translate="editTranslate"
            :canEdit="actionEditTranslate"
            :canDelete="actionDeleteTranslate"
            :languages="langStore.locales"
            :data="translateStore.translateData.items"/>
      </div>

    </template>

    <!--     pagination-->
    <template #pagination>
      <div class="flex justify-between items-center w-full"
           v-if="translateStore.translateData && !!translateStore.translateData.items.length">
        <PersonalUIPagination
            v-if="translateStore.translateData.total_items !== 0"
            :page="translateStore.page"
            :limit="translateStore.limit"
            :pageCount="+translateStore.translateData.limit"
            :total="translateStore.translateData.total_items"
            @update:page="updatePage"
            @update:limit="changeCountPage"
        />
      </div>
    </template>

    <!--    prevent-close for modal-->
    <template #modals>
      <!--      for create translate-->
      <TranslationModalCreate
          @create-translation="saveCreateTranslate"
          @close-modal-create="closeCreateTranslationsModal"
          :languages="langStore.locales"
      />

      <!--      for edit translate value-->
      <TranslationModalEdit
          @edit-translation="saveEditTranslate"
          @close-modal-edit="closeEditTranslationModal"
      />

      <PersonalUIModalConfirm
          :visible="isOpenAgreeModal"
          @cancel-click="closeAgreeModal"
          @agree-click="setAgreeDelete"
      />
    </template>
  </TemplateCrmPage>
</template>

<script setup>
import {useTranslateStore} from "../../../stores/translateStore.js";

useHead({
  title: 'Translations'
})
import {useNuxtApp} from "#app";
import {onMounted, watch} from 'vue';
import {useRouter} from 'vue-router'

import {useUserStore} from "../../../stores/userStore.js";
import {useToastFunc} from "../../../composables/useNotivue.js";
import {useLangStore} from "../../../stores/langStore.js";

const {showNotivue} = useToastFunc();
const router = useRouter();

const {$loader, $permission} = useNuxtApp();
const i18n = useI18n();
const {t} = i18n;
const translateStore = useTranslateStore();
const {userData} = useUserStore();
const langStore = useLangStore();
const isOpenAgreeModal = ref(false);
const currentIdByTranslate = ref(null);

// actions
const actionCreateTranslate = computed(() => $permission.canAction(userData.access, 'create.translate.once'))
const actionEditTranslate = computed(() => $permission.canAction(userData.access, 'edit.translate.once'))
const actionDeleteTranslate = computed(() => $permission.canAction(userData.access, 'delete.translate.once'))
const actionCreateTranslates = computed(() => $permission.canAction(userData.access, 'create.translates.multiple'))
const actionClearCache = computed(() => $permission.canAction(userData.access, 'clear.translate.cache'))


const clearCache = () => {
  $loader.startLoadingPage()
  langStore.locales.forEach(locale =>{
    localStorage.removeItem(`nf_locale_${locale.code}`)
  })
  langStore.loadMessages(langStore.locale, i18n);
  setTimeout(() => {
    $loader.closeLoadingPage()
    showNotivue(false, 't.error.clear.cache', 't.success.clear.cache')
  }, 500)
}

const resetFilterList = async () => {
  await translateStore.resetFilter()
}


const filterList = async () => {
  translateStore.page = 1
  await getTranslates(1)
}

const getTranslates = async (page) => {
  const error = await translateStore.fetchTranslates(page, translateStore.filtersTranslate)
  showNotivue(error, 't.error.load.translates', false)
}


const saveCreateTranslate = async () => {
  const error = await translateStore.createTranslate()
  await getTranslates(1)
  showNotivue(error, 't.error.save.translate', 't.success.save.translate')
}


const closeEditTranslationModal = () => {
  translateStore.closeModalTranslationEdit()
}

const saveEditTranslate = async () => {
  const error = await translateStore.editTranslate()
  await getTranslates(1)
  showNotivue(error, 't.error.save.translate', 't.success.save.translate')
}

const deleteTranslate = (id) => {
  currentIdByTranslate.value = id
  isOpenAgreeModal.value = true
}

const editTranslate = (body) => {
  translateStore.openEditModalTranslate(body)
}

const closeAgreeModal = () => {
  isOpenAgreeModal.value = false
}

const setAgreeDelete = async () => {
  const error = await translateStore.deleteTranslationById(currentIdByTranslate.value)
  if (!error) {
    isOpenAgreeModal.value = false
    await getTranslates(1)
  }
  showNotivue(error, 't.error.delete.translate', 't.success.delete.translate')
}
const updatePage = (newPage) => {
  translateStore.page = newPage
  getTranslates(newPage)
}

const goToCreateTranslations = () => {
  router.push('/settings/templateCreate')
}

const openTranslationsModal = () => {
  translateStore.resetFieldsCreateTranslation()
}

const closeCreateTranslationsModal = () => {
  translateStore.closeModalTranslation()
}

const changeCountPage = (limit) => {
  translateStore.page = 1;  // Скидаємо на першу сторінку
  translateStore.limit = limit
  translateStore.filtersTranslate.limit = limit; // Оновлюємо limit у фільтрах
  getTranslates(1);
};

onMounted(() => {
  translateStore.setPageOnFirst()
  getTranslates(1)
});

</script>

<style>
.table-ui {
  width: calc(100vw - 332px);
}
</style>
