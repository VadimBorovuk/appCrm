<template>
  <client-only>
    <div class="base-modal">
      <slot name="headerModal">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ $t(titleModal) }}
          </h3>
          <UButton color="gray" variant="solid" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="emit('cancel-click')"/>
        </div>

      </slot>

      <UDivider class="my-4"/>

      <slot name="contentModal"/>

      <UDivider class="my-4"/>

      <slot name="footerModal">
        <div class="flex justify-end items-center">
          <div class="ml-3">
            <PersonalUIButton
                @click="emit('cancel-click')"
                description="t.btn.cancel"
            />
          </div>
          <div>
            <UButton
                size="lg"
                class="bg-waterloo-700 hover:bg-waterloo-600 transition duration-300 ease-in-out"
                type="submit">
              {{ $t('t.btn.save') }}
            </UButton>
          </div>
        </div>
      </slot>
    </div>
  </client-only>
</template>

<script setup>
const emit = defineEmits(['cancel-click', 'save-click'])
defineProps({
  titleModal: {
    type: String,
    default: ""
  }
})
</script>
