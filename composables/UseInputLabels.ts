import { ref, onMounted } from 'vue'
import type { PokemonSchema } from '~~/server/parse/pokedex'

type InputMenuItem =
  | { type: 'label', label: string }
  | { type: 'separator' }
  | { type: 'route', label: string }
  | { type: 'pokemon', label: string }
  | { type: 'trainer', label: string }

function createRouteLabels(): InputMenuItem[] {
  return [
    { type: 'route', label: 'Route 101' },
    { type: 'route', label: 'Route 102' },
    { type: 'route', label: 'Route 103' },
    { type: 'route', label: 'Route 104' },
  ]
}

function createTrainerLabels(): InputMenuItem[] {
  return [
    { type: 'trainer', label: 'Youngster Calvin' },
  ]
}

async function createPokemonLabels(): Promise<InputMenuItem[]> {
  const { data, error } = await useFetch<{ success: boolean, data: PokemonSchema[] }>('/api/parse/pokedex')
  console.log(data)
  if (error.value) {
    console.error('Failed to load pokedex data:', error.value)
    return []
  }
  if (data.value?.success) {
    return data.value.data.map(pokemon => ({
      type: 'pokemon',
      label: pokemon.name,
    }))
  }
  console.error('Invalid pokedex data format', data.value)
  return []
}

export function useInputLabels() {
  const items = ref<InputMenuItem[]>([])
  const isLoading = ref(true)

  async function loadItems() {
    try {
      const [routes, trainers, pokemonLabels] = await Promise.all([
        createRouteLabels(),
        createTrainerLabels(),
        createPokemonLabels(),
      ])
      items.value = [
        { type: 'label', label: 'Routes' },
        ...routes,
        { type: 'separator' },
        { type: 'label', label: 'Pokemon' },
        ...pokemonLabels,
        { type: 'separator' },
        { type: 'label', label: 'Trainers' },
        ...trainers,
      ]
    }
    finally {
      isLoading.value = false
    }
  }

  onMounted(() => loadItems())

  return { items, isLoading }
}
