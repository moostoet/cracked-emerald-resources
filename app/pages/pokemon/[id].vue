<template>
  <div class="h-screen flex justify-center items-center">
    <div v-if="currentMon" class="font-display max-w-6xl">
      <UIcon name="material-symbols:arrow-left-alt-rounded" class="size-6 hover:text-green-500 transition cursor-pointer" @click="router.push('/')" />
      <div class="flex gap-3 items-center">
        <p class="text-xl font-bold">
          {{ currentMon.name }}
        </p>
        <p class="text-sm opacity-50 mt-1">
          {{ currentMon.id }}
        </p>
        <div class="flex gap-1 items-center">
          <PokemonType v-if="currentMon.type[0]" :type="currentMon.type[0]" />
          <PokemonType v-if="currentMon.type[1] && currentMon.type[1] !== currentMon.type[0]" :type="currentMon.type[1]" />
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="flex gap-6 items-center">
          <div>
            <NuxtImg :src="`/sprites/${currentMon.name.toLowerCase()}.png`" placeholder />
          </div>
        </div>
        <div class="grid grid-cols-2 space-x-6">
          <div>
            <p class="text-sm font-bold">
              BASE STATS
            </p>
            <PokemonBaseStats :stats="currentMon.base" />
          </div>
          <div>
            <p class="text-sm font-bold">
              LEVEL-UP MOVES (WIP)
            </p>
            <LevelUpMoveTable />
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <div>
            <p class="text-sm font-bold">
              ABILITIES
            </p>
            <p v-for="(ability, index) in currentMon.profile.ability" :key="ability" class="text-sm flex items-center gap-1">
              <span v-if="index === 2 && ability !== 'None'" class="font-bold text-xs">(HIDDEN)</span>
              {{ ability === 'None' ? '---' : ability }}
            </p>
          </div>
          <div>
            <p class="text-sm font-bold">
              HEIGHT
            </p>
            <p class="text-sm">
              {{ currentMon.profile.height }}
            </p>
            <p class="text-sm font-bold">
              WEIGHT
            </p>
            <p class="text-sm">
              {{ currentMon.profile.weight }}
            </p>
          </div>
          <div v-if="currentMon.evolution.next">
            <p class="text-sm font-bold">
              EVOLVES INTO
            </p>
            <div v-if="currentMon.evolution.next[0]">
              <p>
                {{ findPokemonById(currentMon.evolution.next[0][0])?.name }}
              </p>
              <p class="text-sm font-bold">
                METHOD
              </p>
              <p>
                {{ currentMon.evolution.next[0][1] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LevelUpMoveTable from '~~/components/LevelUpMoveTable.vue'
import PokemonBaseStats from '~~/components/PokemonBaseStats.vue'
import PokemonType from '~~/components/PokemonType.vue'
import { usePokedex } from '~~/composables/usePokedex'
import type { PokemonSchema } from '~~/server/parse/pokedex'

const route = useRoute()
const router = useRouter()

const { fetchPokemon, pokemon, findPokemonById } = usePokedex()

const currentMon = ref<PokemonSchema>()

onMounted(async () => {
  await fetchPokemon()
  currentMon.value = pokemon.value.find(p => Number(p.id) === Number(route.params.id))

  console.log(currentMon.value)
})
</script>

<style>
</style>
