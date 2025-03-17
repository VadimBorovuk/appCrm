export const useShowNotivue = (haveError, errorText, successText) => {
  const {t} = useI18n(); // Call once at the top


  const showNotivue = (haveError, errorText, successText) => {

    // push.success('Hello from your first notification!')

    if (haveError) {
      push.error({
        title: t('t.notification.title.error'),
        message: t(errorText),
        // color: 'red',
        // timeout: 2000,
        // icon: 'i-heroicons-x-circle'
      });
    }
    if (!haveError && successText) {
      push.success({
        title: t('t.notification.title.success'),
        message: t(successText),
        // icon: 'i-heroicons-check-circle'
      });
    }
  };

  return {showNotivue};
}
