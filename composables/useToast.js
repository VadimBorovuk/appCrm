export const useToastFunc = (haveError, errorText, successText) => {
  const {t} = useI18n(); // Call once at the top
  const toast = useToast(); // Call once at the top

  const showToast = (haveError, errorText, successText) => {
    if (haveError) {
      toast.add({
        title: t('t.notification.title.error'),
        description: t(errorText),
        color: 'red',
        timeout: 2000,
        icon: 'i-heroicons-x-circle'
      });
    }
    if (!haveError && successText) {
      toast.add({
        title: t('t.notification.title.success'),
        description: t(successText),
        color: 'green',
        timeout: 2000,
        icon: 'i-heroicons-check-circle'
      });
    }
  };

  return {showToast};
}
