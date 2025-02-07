import { ref, onMounted } from 'vue'
import { usePokedex } from './usePokedex'
import type { PokemonSchema } from '~~/server/parse/pokedex'

type InputMenuItem =
  | { type: 'label', label: string }
  | { type: 'separator' }
  | { type: 'route', label: string }
  | { type: 'pokemon', label: string, id: number }
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

function createPokemonLabels(pokemonData: PokemonSchema[]): InputMenuItem[] {
  return pokemonData.map(pokemon => ({
    type: 'pokemon',
    id: Number(pokemon.id),
    label: pokemon.name,
  }))
}

export function useInputLabels() {
  const items = ref<InputMenuItem[]>([])
  const isLoading = ref(true)
  const { fetchPokemon } = usePokedex()

  async function loadItems() {
    try {
      const [routes, trainers, pokemonData] = await Promise.all([
        createRouteLabels(),
        createTrainerLabels(),
        fetchPokemon(),
      ])

      items.value = [
        { type: 'label', label: 'Routes' },
        ...routes,
        { type: 'separator' },
        { type: 'label', label: 'Pokemon' },
        ...createPokemonLabels(pokemonData),
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
