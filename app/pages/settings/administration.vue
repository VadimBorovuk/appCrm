<template>
  <div>
    <PersonalUITitle :title="titleContent" icon="mdi:upload-circle"/>
    <USeparator class="mt-2"/>
    <div class="flex justify-between my-4">
      <div class="flex-1 mr-2">
        <h3 class="font-bold mb-2">{{ $t('t.list.routes.api') }}</h3>
        <div v-for="item in routeStore.generatedRouters" :key="item.path"
             class="px-6 py-3 bg-white rounded-lg mb-1">
          <b>{{ item.name }}</b> - {{ item.path }}
        </div>
      </div>
      <div class="flex-1">
        <h3 class="font-bold mb-2">{{ $t('t.list.routes.system') }}</h3>
        <div v-for="item in routeStore.currentRoutes" :key="item.path"
             class="px-6 py-3 bg-white rounded-lg mb-1">
          <b>{{ item.name }}</b> - {{ item.path }}
        </div>
      </div>
    </div>
    <div class="flex items-center justify-start">
      <PersonalUIButton
          :disabled="false"
          active
          icon="simple-icons:convertio"
          @click="saveRoutesToJson"
          description="t.btn.generate.route"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useShowNotivue} from "~/composables/useNotivue.js";
import {useRouteGenerateStore} from "~/stores/routeGenerateStore.js";
import {useTranslatedHead} from "~/composables/useTranslatedHead.js";
const {showNotivue} = useShowNotivue();

const titleContent = ref('t.settings.administration');
const routeStore = useRouteGenerateStore();

const setGenerateRoutes = async () => {
  const error = await routeStore.getRoutesFunc();
  showNotivue(error, 't.error.load.route', false)
};

const saveRoutesToJson = async () => {
  const error = await routeStore.saveRoutesFunc();
  showNotivue(error, 't.error.save.route', 't.success.save.route')
};

onMounted(() => {
  routeStore.setCurrentRoutes();
  setGenerateRoutes();
});

useHead({
  title: useTranslatedHead(titleContent.value)
});
</script>
