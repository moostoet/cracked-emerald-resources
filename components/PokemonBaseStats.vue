<template>
  <div class="flex flex-col gap-2 mt-3">
    <StatBlock text="HP" :stat="currentStats.HP" />
    <StatBlock text="Attack" :stat="currentStats.Attack" />
    <StatBlock text="Defense" :stat="currentStats.Defense" />
    <StatBlock text="Sp. Attack" :stat="currentStats['Sp. Attack']" />
    <StatBlock text="Sp. Defense" :stat="currentStats['Sp. Defense']" />
    <StatBlock text="Speed" :stat="currentStats.Speed" />
  </div>
</template>

<script lang="ts" setup>
import StatBlock from './StatBlock.vue'

interface BaseStats {
  'HP': number
  'Attack': number
  'Defense': number
  'Sp. Attack': number
  'Sp. Defense': number
  'Speed': number
}

const props = defineProps<{ stats: BaseStats }>()

const currentStats = props.stats
</script>

<style>

</style>
