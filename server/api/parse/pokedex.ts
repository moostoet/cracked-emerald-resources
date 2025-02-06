import pokedexData from '../../../data/pokedex.json'
import { pokedexSchema } from '~~/server/parse/pokedex'

export default defineEventHandler(async () => {
  return pokedexSchema.safeParse(pokedexData)
})
