<script setup lang="ts">
import { test } from 'effect/Logger'
import { useInputLabels } from '~~/composables/UseInputLabels'

const router = useRouter()

type InputMenuItem =
  | { type: 'label', label: string }
  | { type: 'separator' }
  | { type: 'route', label: string }
  | { type: 'pokemon', label: string, id: number }
  | { type: 'trainer', label: string }

function hasLabel(item: InputMenuItem): item is Exclude<InputMenuItem, { type: 'separator' }> {
  return 'label' in item
}

const { items, isLoading } = useInputLabels()

const selectedItem = ref<InputMenuItem>()

const searchQuery = ref('')

const getPokemonUrl = (label: string) => {
  if (label === 'Type: Null') label = 'Type-Null'
  if (label === 'Zygarde-10%') label = 'Zygarde-10'
  if (label === 'Eiscue-Ice') label = 'Eiscue'
  if (label === 'Nidoran♀-F') label = 'Nidoran-F'
  if (label === 'Nidoran♂') label = 'Nidoran-M'
  return label
}

const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return items.value

  const lowerQuery = searchQuery.value.toLowerCase()
  return items.value.filter(item => hasLabel(item) && item.label.toLowerCase().includes(lowerQuery))
})

watch(selectedItem, (newVal) => {
  if (newVal?.type === 'pokemon') router.push(`pokemon/${newVal.id}`)
})
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="max-w-2xl space-y-3">
      <p class="title font-display text-4xl w-full">
        Pokémon <span class="font-bold text-green-500">Cracked Emerald</span> Resources
      </p>
      <UInputMenu
        v-model="selectedItem"
        v-model:search="searchQuery"
        :items="filteredItems"
        placeholder="Search for resources..."
        class="w-full"
        size="xl"
        icon="i-lucide-search"
        :loading="isLoading"
        @change="test"
      >
        <template #item-leading="{ item }">
          <UIcon v-if="item.type === 'route'" class="text-green-500" name="i-lucide-map" />
          <img v-if="item.type === 'pokemon'" loading="lazy" :src="`/pokemon/${getPokemonUrl(item.label)}.png`" alt=" ">
          <UIcon v-if="item.type === 'trainer'" class="text-green-500" name="mdi-pokeball" />
        </template>
        <template #item-trailing="{ item }">
          <p v-if="item.type === 'pokemon'" class="opacity-50 font-semibold text-xs">
            {{ item.id }}
          </p>
        </template>
      </UInputMenu>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 32px;
}

@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}

a {
  color: #888;
  text-decoration: none;
  font-size: 18px;
}

a:hover {
  text-decoration: underline;
}
</style>
