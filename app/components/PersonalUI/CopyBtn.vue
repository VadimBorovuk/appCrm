<template>
  <Icon @click="copyValue"
        :title="$t(textCopy)"
        class="ml-2 cursor-pointer" :size="20" name="ep:copy-document"/>
</template>

<script setup>

import {useClipboard} from "../../../composables/useClipboard.js";
import {useToastFunc} from "../../../composables/useToast.js";

const props = defineProps({
  textCopy: {
    type: String,
    default: "t.btn.copy"
  },
  valueCopy: {
    type: String,
    default: ""
  }
})
const {t} = useI18n()
const { copyToClipboard } = useClipboard();
const {showToast} = useToastFunc();

const copyValue = async () => {
  const success = await copyToClipboard(props.valueCopy);
  showToast(!success, 't.error.save.translate', 't.success.copy')
};
</script>
