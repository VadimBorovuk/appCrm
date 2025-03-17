<template>
  <div>
    <PersonalUITitle title="t.settings.administration" icon="mdi:upload-circle"/>
    <USeparator class="mt-2"/>
    <div class="lists-holder">
      <div>
        <div class="ibox float-e-margins">
          <div class="ibox-content">
            <h3 class="font-bold">{{ $t('t.list.routes.api') }}</h3>
            <client-only>
              <div v-for="item in routeStore.generatedRouters" :key="item.path" class="list-group-item">
                <b>{{ item.name }}</b> - {{ item.path }}
              </div>
              <br/>
            </client-only>
          </div>
        </div>
      </div>
      <div>
        <div class="ibox float-e-margins">
          <div class="ibox-content">
            <h3 class="font-bold">{{ $t('t.list.routes.system') }}</h3>
            <client-only>
              <div v-for="item in routeStore.currentRoutes" :key="item.path" class="list-group-item">
                <b>{{ item.name }}</b> - {{ item.path }}
              </div>
            </client-only>
          </div>
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
import {useRouteGenerateStore} from "../../../stores/routeGenerateStore.js";

useHead({
  title: "Generate routes"
})

import {onMounted} from 'vue';
import {useShowNotivue} from "../../../composables/useNotivue.js";


const routeStore = useRouteGenerateStore();
const {showNotivue} = useShowNotivue();

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
</script>

<style scoped>
.ibox {
  margin-top: 30px;
}

.ibox .ibox-title {
  margin-bottom: 5px;
}

.ibox .ibox-content > h3 {
  margin-bottom: 10px;
}

.btn-main {
  padding: 10px 30px;
}

.lists-holder {
  display: flex;
  justify-content: space-between;
}

.lists-holder > div {
  width: 49%;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid #ebedf2;
  border-radius: 0.25rem;
}
</style>

