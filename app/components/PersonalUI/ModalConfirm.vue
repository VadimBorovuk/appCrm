<template>
  <UModal :open="visible"
          @update:open="handleClose"
          :title="$t('t.modal.agree.title')">
    <template #body>
      <div>
        <p class="text-xl">{{ $t('t.title.agree.confirm') }}</p>
        <p>{{ $t('t.text.agree.confirm') }}</p>
      </div>
      <div class="flex justify-end items-center mt-4">
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
    </template>
  </UModal>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['cancel-click', 'agree-click'])
const handleClose = () => {
  emit('cancel-click');
};
</script>
