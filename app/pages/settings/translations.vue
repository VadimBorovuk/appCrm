<template>
  <TemplateCrmPage title="t.settings.translations">
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

<!--    <template #table>-->
<!--      <div class="table-ui">-->
<!--        <TranslationTable-->
<!--            @delete-translate="deleteTranslate"-->
<!--            @edit-translate="editTranslate"-->
<!--            :canEdit="actionEditTranslate"-->
<!--            :data="translateStore.translateData"/>-->
<!--      </div>-->

<!--    </template>-->

    <!-- pagination -->
<!--    <template #pagination>-->
<!--      <div class="flex justify-end w-full">-->
<!--        <PersonalUIPagination-->
<!--            v-if="translateStore.translateData.total_items !== 0"-->
<!--            v-model:page="translateStore.page"-->
<!--            :pageCount="+translateStore.translateData.limit"-->
<!--            :total="translateStore.translateData.total_items"-->
<!--        />-->
<!--      </div>-->

<!--    </template>-->

    <!--    prevent-close for modal-->
<!--    <template #modals>-->
<!--      &lt;!&ndash;      for create translate&ndash;&gt;-->
<!--      <UModal v-model="translateStore.isOpenCreateTranslate">-->
<!--        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">-->
<!--          <UForm :validate="validateCreate" :state="translateStore.objCreateTranslation" class="space-y-4"-->
<!--                 @submit="saveCreateTranslate">-->

<!--            <TemplateModal-->
<!--                @cancel-click="closeTranslationsModal"-->
<!--                titleModal="t.settings.translations.add"-->
<!--            >-->
<!--              <template #headerModal/>-->

<!--              <template #contentModal>-->

<!--                <UFormGroup name="lang" class="mb-3">-->
<!--                  <div class="relative">-->
<!--                    <USelectMenu-->
<!--                        searchable-->
<!--                        clear-search-on-close-->
<!--                        size="lg"-->
<!--                        v-model="translateStore.objCreateTranslation.lang"-->
<!--                        :options="langStore.locales"-->
<!--                        value-attribute="code"-->
<!--                        option-attribute="name"-->
<!--                        :searchable-placeholder="$t('t.filter.lang')"-->
<!--                        :placeholder="$t('t.filter.lang')"-->
<!--                        class="pl-[80px]"-->
<!--                    />-->
<!--                    <div-->
<!--                        class="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 w-[70px] break-words">-->
<!--                      {{ $t('t.filter.lang') }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </UFormGroup>-->

<!--                <UFormGroup name="code" class="mb-3">-->
<!--                  <div class="relative">-->
<!--                    <UInput-->
<!--                        v-model.trim="translateStore.objCreateTranslation.code"-->
<!--                        size="lg"-->
<!--                        class="pl-[80px]"-->
<!--                        :placeholder="$t('t.filter.code')"/>-->
<!--                    <div-->
<!--                        class="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 w-[70px] break-words">-->
<!--                      {{ $t('t.filter.code') }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </UFormGroup>-->

<!--                <UFormGroup name="value" class="mb-3">-->
<!--                  <div class="relative">-->
<!--                    <UInput-->
<!--                        v-model.trim="translateStore.objCreateTranslation.value"-->
<!--                        size="lg"-->
<!--                        class="pl-[80px]"-->
<!--                        :placeholder="$t('t.filter.value')"/>-->
<!--                    <div-->
<!--                        class="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 w-[70px] break-words">-->
<!--                      {{ $t('t.filter.value') }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </UFormGroup>-->
<!--              </template>-->
<!--              <template #footerModal/>-->
<!--            </TemplateModal>-->
<!--          </UForm>-->
<!--        </UCard>-->
<!--      </UModal>-->

<!--      &lt;!&ndash;      agree modal&ndash;&gt;-->
<!--      <PersonalUIModalConfirm-->
<!--          :visible="isOpenAgreeModal"-->
<!--          @cancel-click="closeAgreeModal"-->
<!--          @agree-click="setAgreeClick"-->
<!--      />-->

<!--      &lt;!&ndash;      for edit translate value&ndash;&gt;-->
<!--      <UModal v-model="translateStore.isOpenEditTranslate">-->
<!--        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">-->
<!--          <UForm :validate="validateEdit" :state="translateStore.objEditTranslation" class="space-y-4"-->
<!--                 @submit="saveEditTranslate">-->

<!--            <TemplateModal-->
<!--                @cancel-click="closeEditTranslationModal"-->
<!--                titleModal="t.settings.list.edit"-->
<!--            >-->
<!--              <template #headerModal/>-->
<!--              <template #contentModal>-->
<!--                <UFormGroup name="value" class="mb-3">-->
<!--                  <div class="relative">-->
<!--                    <UTextarea-->
<!--                        v-model.trim="translateStore.objEditTranslation.value"-->
<!--                        size="lg"-->
<!--                        class="pl-[80px]"-->
<!--                        :placeholder="$t('t.filter.value')"/>-->
<!--                    <div-->
<!--                        class="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 w-[70px] break-words">-->
<!--                      {{ $t('t.filter.value') }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </UFormGroup>-->

<!--              </template>-->
<!--              <template #footerModal/>-->
<!--            </TemplateModal>-->
<!--          </UForm>-->
<!--        </UCard>-->
<!--      </UModal>-->
<!--    </template>-->
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
import {useToastFunc} from "../../../composables/useToast.js";
import {useLangStore} from "../../../stores/langStore.js";

const router = useRouter();
const {showToast} = useToastFunc();
const {$loader, $permission} = useNuxtApp();
const i18n = useI18n();
const {t} = i18n;
const translateStore = useTranslateStore();
const {userData} = useUserStore();
const langStore = useLangStore();
const isOpenAgreeModal = ref(false);
const currentIdByTranslate = ref(null);
// actions
// const actionCreateTranslate = computed(() => $permission.canAction(userData.access, 'create.translate.once'))
// const actionEditTranslate = computed(() => $permission.canAction(userData.access, 'edit.translate.once'))
// const actionCreateTranslates = computed(() => $permission.canAction(userData.access, 'create.translates.multiple'))
// const actionClearCache = computed(() => $permission.canAction(userData.access, 'clear.translate.cache'))



const actionCreateTranslate = computed(() => true)
const actionEditTranslate = computed(() => true)
const actionCreateTranslates = computed(() => true)
const actionClearCache = computed(() => true)
// validate form
const validateCreate = (state) => {
  const errors = []

  if (!state.lang) errors.push({path: 'lang', message: 'Required lang'})
  if (!state.code) errors.push({path: 'code', message: 'Required code'})
  if (!state.value) errors.push({path: 'value', message: 'Required value'})
  return errors
}

const validateEdit = (state) => {
  const errors = []
  if (!state.value) errors.push({path: 'value', message: 'Required value'})
  return errors
}

const clearCache = () => {
  $loader.startLoadingPage()
  localStorage.removeItem('nf_locale_')
  localStorage.removeItem('nf_locale_')
  localStorage.removeItem('nf_locale_')
  localStorage.removeItem('nf_locale_')
  localStorage.removeItem('nf_locale_')
  langStore.loadMessages(langStore.locale, i18n);
  setTimeout(() => {
    $loader.closeLoadingPage()
    showToast(false, 't.error.clear.cache', 't.success.clear.cache')
  }, 500)
}

const goToCreateTranslations = () => {
  router.push('/settings/templateCreate')
}

const openTranslationsModal = () => {
  translateStore.resetFieldsCreateTranslation()
}

const closeTranslationsModal = () => {
  translateStore.closeModalTranslation()
}

const resetFilterList = () => {
  translateStore.resetFilter()
}

const closeEditTranslationModal = () => {
  translateStore.closeModalTranslationEdit()
}

const filterList = async () => {
  await getTranslates()
}

// for GET Method
const getTranslates = async (page) => {
  const error = await translateStore.fetchTranslates(page, translateStore.filtersTranslate)
  showToast(error, 't.error.load.translates', false)
}

// for GET Method

// for POST Method
const saveCreateTranslate = async () => {
  const error = await translateStore.createTranslate()
  showToast(error, 't.error.save.translate', 't.success.save.translate')
}

const saveEditTranslate = async () => {
  const error = await translateStore.editTranslate()
  showToast(error, 't.error.save.translate', 't.success.save.translate')
}

const deleteTranslate = (id) => {
  currentIdByTranslate.value = id
  isOpenAgreeModal.value = true
}

const closeAgreeModal = () => {
  isOpenAgreeModal.value = false
}

const setAgreeClick = async () => {
  const error = await translateStore.deleteTranslationById(currentIdByTranslate.value)
  showToast(error, 't.error.delete.translate', 't.success.delete.translate')
  if (!error) {
    isOpenAgreeModal.value = false
  }
}

const editTranslate = (body) => {
  translateStore.openEditModalTranslate(body)
}

onMounted(() => {
  translateStore.setPageOnFirst()
  getTranslates(1)
});

watch(() => translateStore.page,
    (newPage) => {
      getTranslates(newPage)
    })
</script>

<style>
.table-ui {
  width: calc(100vw - 332px);
}
</style>
