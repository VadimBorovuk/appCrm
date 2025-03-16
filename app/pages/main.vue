<template>
  <client-only>
    <PersonalUITitle title="t.settings.main"/>
    <span>
          {{ userData.role }}
          {{ userData.user_info.id }}
          {{ userData.user_info.name }}
        </span>
  </client-only>
</template>

<script setup>
useHead({
  title: "Home page"
})
import {useUserStore} from "../../stores/userStore.js";

const {userData} = useUserStore();
</script>
