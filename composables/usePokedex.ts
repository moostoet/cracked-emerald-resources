import { ref } from 'vue'
import type { PokemonSchema } from '~~/server/parse/pokedex'

export function usePokedex() {
  const pokemon = ref<PokemonSchema[]>([])
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  async function fetchPokemon() {
    // Only fetch if we don't already have the data
    if (pokemon.value.length === 0) {
      try {
        const response = await $fetch<{ success: boolean, data: PokemonSchema[] }>('/api/parse/pokedex')
        console.log(response)
        if (response.success) {
          pokemon.value = response.data
        }
        else {
          throw new Error('Invalid pokedex data format')
        }
      }
      catch (e) {
        error.value = e instanceof Error ? e : new Error('Failed to load pokedex data')
        console.error('Failed to load pokedex data:', e)
      }
      finally {
        isLoading.value = false
      }
    }
    return pokemon.value
  }

  const findPokemonById = (id: string) => {
    return pokemon.value.find(p => Number(p.id) === Number(id))
  }

  return {
    pokemon,
    isLoading,
    error,
    fetchPokemon,
    findPokemonById,
  }
}
