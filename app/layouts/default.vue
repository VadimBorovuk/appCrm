<template>
  <UApp>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <LoadingView/>
    <!--  <button @click="push.success('Hi! I am your first notification!')">Push</button>-->
    <main class="h-full">
      <div class="page-holder h-full flex">
        <SidebarContent/>
        <div class="flex-1 p-5">
          <NuxtPage/>
        </div>
      </div>
    </main>
  </UApp>
</template>

<script setup lang="ts">
</script>
