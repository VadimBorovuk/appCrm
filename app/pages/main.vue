<template>
  <client-only>
    <PersonalUITitle title="t.settings.main"/>
      <span>
          {{ userData.role }}
          {{userData.user_info.id}}
          {{userData.user_info.name}}
        </span>
  </client-only>
</template>

<script setup>

import {useUserStore} from "../../stores/userStore.js";

useHead({
  title: "Home page"
})

const userStore = useUserStore()
const {userData} = userStore
</script>
