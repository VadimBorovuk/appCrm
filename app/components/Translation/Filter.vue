<template>
  <div class="flex items-center">
    <div class="mr-3">
      <USelectMenu
          class="w-[200px]"
          searchable
          clear-search-on-close
          size="lg"
          v-model="filters.lang"
          :items="languages"
          value-key="code"
          label-key="name"
          :searchable-placeholder="$t('t.filter.lang')"
          :placeholder="$t('t.filter.lang')"
      />
    </div>
    <div class="mr-3">
      <UInput
          v-model.trim="filters.code"
          size="lg"
          :placeholder="$t('t.filter.code')"/>
    </div>
    <div class="mr-3">
      <UInput
          v-model.trim="filters.value"
          size="lg"
          :placeholder="$t('t.filter.value')"/>
    </div>
    <div class="flex justify-end items-center">
      <div class="mr-3">
        <custom-btn
            @click="emit('reset-filter')"
            description="t.reset"
        />
      </div>
      <div>
        <custom-btn
            @click="emit('active-filter')"
            active
            description="t.show"
        />
      </div>
    </div>
  </div>

</template>

<script setup>
import CustomBtn from "~/components/PersonalUI/Button.vue";

defineProps({
  filters: {
    type: Object,
    default: {}
  },
  languages: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['reset-filter', 'active-filter'])
</script>

<style lang="scss">
</style>
