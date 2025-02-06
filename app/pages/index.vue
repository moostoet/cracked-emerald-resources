<script setup lang="ts">
import { useInputLabels } from '~~/composables/UseInputLabels'

type InputMenuItem =
  | { type: 'label', label: string }
  | { type: 'separator' }
  | { type: 'route', label: string }
  | { type: 'pokemon', label: string }
  | { type: 'trainer', label: string }

function hasLabel(item: InputMenuItem): item is Exclude<InputMenuItem, { type: 'separator' }> {
  return 'label' in item
}

// Get our full list of items (Routes, Pokémon, Trainers, etc.)
const { items, isLoading } = useInputLabels()

// v-model for the selected item (or whatever UInputMenu expects)
const selectedItem = ref<InputMenuItem | null>(null)

// Create a separate reactive property for the search input
// (Assuming UInputMenu supports binding its search text via v-model:search or similar)
const searchQuery = ref('')

// Instead of a hacky replacement function, use encodeURIComponent
const getPokemonUrl = (label: string) => {
  if (label === 'Type: Null') label = 'Type-Null'
  if (label === 'Zygarde-10%') label = 'Zygarde-10'
  if (label === 'Eiscue-Ice') label = 'Eiscue'
  if (label === 'Nidoran♀-F') label = 'Nidoran-F'
  if (label === 'Nidoran♂') label = 'Nidoran-M'
  return label
}

// Create a computed property that filters the list based on the search query.
// When there is no query, return the full list.
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return items.value

  const lowerQuery = searchQuery.value.toLowerCase()
  return items.value.filter(item => hasLabel(item) && item.label.toLowerCase().includes(lowerQuery))
})
</script>

<template>
  <div class="centered max-w-2xl w-full mx-auto space-y-3">
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
    >
      <template #item-leading="{ item }">
        <UIcon v-if="item.type === 'route'" class="text-green-500" name="i-lucide-map" />
        <img v-if="item.type === 'pokemon'" loading="lazy" :src="`/pokemon/${getPokemonUrl(item.label)}.png`" alt=" ">
        <UIcon v-if="item.type === 'trainer'" class="text-green-500" name="mdi-pokeball" />
      </template>
    </UInputMenu>
  </div>
</template>

<style scoped>
.centered {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

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
