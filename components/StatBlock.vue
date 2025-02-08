<template>
  <div class="flex items-center gap-2 relative">
    <div class="flex items-center gap-2">
      <p class="w-28 text-right">
        {{ text }}
      </p>
      <p class="w-10 text-right text-sm font-thin">
        {{ currentValue }}
      </p>
    </div>
    <div class="w-70 h-5 rounded-full">
      <div
        class="h-5 rounded-full"
        :class="getColorClass(currentValue)"
        :style="{ width: computeProgressWidth(currentValue) }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string
  stat: number
}>()

const currentValue = props.stat

// Returns a class based on the current stat value.
const getColorClass = (stat: number) => {
  if (stat < 50) return 'bg-red-400'
  if (stat < 100) return 'bg-orange-400'
  if (stat < 130) return 'bg-green-300'
  if (stat < 160) return 'bg-green-600'
  return 'bg-cyan-300'
}

// Computes the width percentage based on the current value over a maximum of 255.
const computeProgressWidth = (value: number, max = 255): string => {
  // Clamp the value between 0 and max for safety.
  const clamped = Math.min(Math.max(value, 0), max)
  return ((clamped / max) * 100) + '%'
}
</script>
