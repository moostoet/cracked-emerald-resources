<template>
  <div>
    <NuxtImg :src="`/types/${props.type}.png`" alt="" placeholder width="36" height="16" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ type: string }>()
</script>

<style>

</style>
