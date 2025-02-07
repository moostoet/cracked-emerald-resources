import { z } from 'zod'

// Schema for the "base" object (stats)
const baseStatsSchema = z.object({
  'HP': z.number(),
  'Attack': z.number(),
  'Defense': z.number(),
  'Sp. Attack': z.number(),
  'Sp. Defense': z.number(),
  'Speed': z.number(),
})

// Schema for the "evolution" object.
// It might contain a "next" property as an array of [string, string] tuples,
// but it can also be empty.
const evolutionSchema = z.object({
  next: z.array(
    z.union([
      z.tuple([z.string(), z.string()]),
      z.tuple([z.string(), z.string(), z.string()]),
    ]),
  ).optional(),
})

// Schema for the "profile" object.
const profileSchema = z.object({
  height: z.string(),
  weight: z.string(),
  egg: z.array(z.string()),
  ability: z.array(z.string()),
})

// Schema for the "image" object.
const imageSchema = z.object({
  sprite: z.string().url(),
})

// Main Pokémon schema for a single entry.
const pokemonSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.array(z.string()),
  base: baseStatsSchema,
  species: z.string(),
  evolution: evolutionSchema,
  profile: profileSchema,
  image: imageSchema,
})

// If you want to make use of the inferred TypeScript type elsewhere:
export type PokemonSchema = z.infer<typeof pokemonSchema>

// Since your pokedex.json file is an array of Pokémon objects,
// wrap the pokemonSchema inside a z.array:
export const pokedexSchema = z.array(pokemonSchema)
