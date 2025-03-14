<template>
  <UModal :model-value="visible">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {{ $t('t.modal.title.agree') }}
        </h3>
        <UButton color="gray" variant="solid" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                 @click="emit('cancel-click')"/>
      </div>
      <UDivider class="my-4"/>
      <div>
        <p class="text-xl">{{ $t('t.title.agree.confirm') }}</p>
        <p>{{ $t('t.text.agree.confirm') }}</p>
      </div>
      <UDivider class="my-4"/>
      <div class="flex justify-end items-center">
        <div>
          <PersonalUIButton
              active
              @click="emit('agree-click')"
              description="t.btn.agree"
          />
        </div>
        <div class="ml-3">
          <PersonalUIButton
              @click="emit('cancel-click')"
              description="t.btn.cancel"
          />
        </div>

      </div>
    </UCard>
  </UModal>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cancel-click', 'agree-click'])
const isOpenAgreeModal = ref(false);
const closeAgreeModal = () => {
  isOpenAgreeModal.value = false
}
</script>
