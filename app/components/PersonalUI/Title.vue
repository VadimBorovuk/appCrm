<template>
  <client-only>
    <div class="flex items-center min-h-[40px]">
      <div
          class="mr-3 flex items-center cursor-pointer"
          @click="goBackPage"
          v-if="btnBackVisible"
      >
        <Icon class="mr-2" :size="25"
              name="ep:arrow-left"
        />
      </div>
      <div class="flex items-center">
        <Icon v-if="!btnBackVisible" class="text-black mr-2" :size="30" :name="icon"/>
        <span class="text-[#131728] text-2xl font-bold">{{ $t(title) }}</span>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import {useRouter} from "#vue-router";

defineProps({
  title: {
    type: String,
    default: ''
  },
  btnBackVisible: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ""
  }
})
const router = useRouter();
const goBackPage = () => {
  router.go(-1)
}
</script>
