// export default defineNuxtPlugin((nuxtApp) => {
//   const searchLang = {
//     getTranslationOfWindow: function () {
//       window.addEventListener("keypress", (ev) => {
//         var selObj = window.getSelection().toString().trim();
//
//         if (ev.ctrlKey) {
//           if (selObj.length !== 0) {
//             console.log(selObj)
//             // this.$store.commit("SET_VALUE_TRANSLATE", selObj);
//             // // this.$bvModal.show('modal-trans')
//             // this.showGenerateResult = true;
//             // this.selectCode = [];
//           }
//           // this.dataLangs = [];
//           // this.objlang = JSON.parse(
//           //     localStorage.getItem(`crm_locale_${this.localeLang}`)
//           // );
//           // for (var lang in this.objlang.locales) {
//           //   if (this.objlang.locales[lang] === selObj) {
//           //     this.dataLangs.push({
//           //       status: 0,
//           //       new_text: "",
//           //       [`${lang}`]: this.objlang.locales[lang],
//           //     });
//           //   }
//           // }
//         }
//       });
//     },
//   };
//
//   nuxtApp.provide('searchLang', searchLang);
// });


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
