import { defineEventHandler } from 'h3'
import wildEncounterData from '../../../data/wild_encounters.json'
import { WildEncounterGroupSchema } from '../../parse/wildEncounters'

export default defineEventHandler(() => {
  // Make sure the wild_encounter_groups array exists and is not empty.
  if (
    !wildEncounterData
    || !wildEncounterData.wild_encounter_groups
    || wildEncounterData.wild_encounter_groups.length === 0
  ) {
    throw new Error('No wild encounter groups found.')
  }

  // Use only the first wild encounter group (the one with for_maps: true and full data)
  const mainGroup = wildEncounterData.wild_encounter_groups[0]

  // Validate and transform just that one object using our Zod schema.
  const parsedGroup = WildEncounterGroupSchema.parse(mainGroup)

  return parsedGroup
})
