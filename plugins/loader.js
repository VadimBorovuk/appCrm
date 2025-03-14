
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const data = ref(false)

  const startLoadingPage = () => {
    data.value = true
  }

  const closeLoadingPage = () => {
    data.value = false
  }

  router.beforeEach((to, from, next) => {
    startLoadingPage();
    next();
  });

  router.afterEach(() => {
    setTimeout(() => {
      closeLoadingPage();
    }, 500); // Затримка для плавного закриття
  });

  nuxtApp.provide('loader', {
    data,
    startLoadingPage,
    closeLoadingPage
  })
});

