<template>
  <client-only>
    <PersonalUITitle title="t.settings.main" icon="mdi:home-circle"/>
    <USeparator class="mt-2"/>
    <div class="mt-2">
      <span>
      {{ userData.role }}
      {{ userData.user_info.id }}
      {{ userData.user_info.name }}
    </span>
    </div>
  </client-only>
</template>

<script setup>
useHead({
  title: "Home page"
})
import {useUserStore} from "../../stores/userStore.js";

const {userData} = useUserStore();
</script>



