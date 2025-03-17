export default defineNuxtPlugin((nuxtApp) => {
  const selectedText = useState('selectedText', () => '');

  const handleKeypress = (event) => {
    const selObj = window.getSelection().toString().trim();
    if (event.ctrlKey && selObj.length !== 0) {
      selectedText.value = null; // Скидаємо, щоб `watch` реагував навіть на те саме слово
      setTimeout(() => {
        selectedText.value = selObj;
      }, 10); // Невелика затримка для реактивності
    }
  };


  if (process.client) {
    window.addEventListener('keypress', handleKeypress);
    nuxtApp.hook('app:beforeUnmount', () => {
      window.removeEventListener('keypress', handleKeypress);
    });
  }

  return {
    provide: {
      selectedText,
    },
  };
});
