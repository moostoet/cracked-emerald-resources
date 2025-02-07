<template>
  <div class="flex items-center gap-2 relative">
    <p class="w-28 text-right">
      {{ text }}
    </p>
    <UProgress
      v-model="currentValue"
      size="2xl"
      :max="255"
      :class="`max-w-lg [&>div>div]:${getColorClass(currentValue)}`"
    />
    <p class="absolute right-36 text-xs">
      {{ currentValue }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string
  stat: number
}>()

const currentValue = props.stat

const getColorClass = (stat: number) => {
  if (stat < 50) return 'bg-red-400'
  if (stat < 100) return 'bg-orange-400'
  if (stat < 130) return 'bg-green-300'
  if (stat < 160) return 'bg-green-600'
  return 'bg-cyan-300'
}
</script>

<style>

</style>
