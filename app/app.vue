<script setup lang="ts">
import AppVersion from '~~/components/AppVersion.vue'
</script>

<template>
  <UApp>
    <AppVersion />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtLoadingIndicator :throttle="0" />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
