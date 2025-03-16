<template>
  <aside class="w-[260px] min-h-screen bg-white px-4">
    <client-only>
      <Navigation/>
      <NavigationLinks
          :filteredLinks="filteredLinks"
      />
    </client-only>
  </aside>
</template>

<script setup>
import {ref} from 'vue';
import {useUserStore} from "../../../stores/userStore.js";

const {$permission} = useNuxtApp();
const {userData} = useUserStore()

const menuLinks = ref([
  [
    {
      label: 't.nav.main',
      icon: 'material-symbols-light:house-rounded',
      type: 'link',
      to: '/main',
      visible: true // Завжди відображається
    },
    {
      label: 't.nav.settings',
      icon: 'material-symbols-light:settings-rounded',
      collapsed: false,
      visible: $permission.canAction(userData.access, 'route.link.settings'), // Відображення залежить від змінної
      children: [
        {
          label: 't.nav.administration',
          to: '/settings/administration',
          visible: $permission.canAction(userData.access, 'route.link.administration'),
        },
        {
          label: 't.nav.translations',
          to: '/settings/translations',
          visible: $permission.canAction(userData.access, 'route.link.translations'),
        }
      ]
    }
  ]
])

// Фільтруємо тільки видимі елементи
const filteredLinks = computed(() =>
    menuLinks.value.map(group =>
        group.filter(item => item.visible !== false)
    )
)
</script>
