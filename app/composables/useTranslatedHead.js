import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

export const useTranslatedHead = (key) => {
  const {t} = useI18n();
  return computed(() => t(key));
}
