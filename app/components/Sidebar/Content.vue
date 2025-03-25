<template>
  <aside class="w-[260px] min-h-screen bg-white dark:bg-waterloo-800 dark:text-white px-4">
    <client-only>
      <Navigation/>
      <NavigationLinks
          :filteredLinks="filteredLinks"
      />
    </client-only>
  </aside>
</template>

<script setup>
import {useRoute} from "vue-router";

const {$permission} = useNuxtApp();
const {userData} = useUserStore();
const {t} = useI18n(); // Call once at the top

const route = useRoute();
const menuLinks = computed(() => [
  [
    {
      label: t('t.nav.main'),
      icon: 'material-symbols-light:house-rounded',
      type: 'link',
      to: '/main',
      visible: true,
      class: 'dark:text-white'
    },
    {
      label: t('t.nav.settings'),
      icon: 'material-symbols-light:settings-rounded',
      defaultOpen: route.path.startsWith('/settings'),
      visible: $permission.canAction(userData.access, 'route.link.settings'),
      class: 'dark:text-white',
      children: [
        {
          label: t('t.nav.administration'),
          to: '/settings/administration',
          visible: $permission.canAction(userData.access, 'route.link.administration'),
          class: 'dark:text-white',
        },
        {
          label: t('t.nav.translations'),
          to: '/settings/translations',
          visible: $permission.canAction(userData.access, 'route.link.translations'),
          class: 'dark:text-white'
        }
      ]
    }
  ]
]);

// Фільтруємо тільки видимі елементи
const filteredLinks = computed(() =>
    menuLinks.value.map(group =>
        group.filter(item => item.visible !== false)
    )
)
</script>
