<template>
  <client-only v-if="visible">
    <div
        @click="!disabled && emit('click')"
        class="flex items-center justify-center text-sm
         cursor-pointer py-2 px-3 rounded-lg transition duration-300 ease-in-out"
        :class="
        active ? 'bg-waterloo-700 dark:bg-waterloo-50 hover:bg-waterloo-600 hover:dark:bg-waterloo-200' :
         'bg-waterloo-50 dark:bg-whiteLilac-500 hover:dark:bg-waterloo-200'"
    >
      <Icon v-if="icon"
            :class="active ? 'text-white dark:text-black' : 'text-black dark:text-black'"
            class="mr-2" :size="20" :name="icon"/>
      <p class="text-md font-bold break-all"
         :class="active ? 'text-white dark:text-black' : 'text-black dark:text-black'"
      >{{ $t(description) }}</p>
    </div>
  </client-only>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

