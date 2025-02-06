import { z } from 'zod'

// ─── HELPER FUNCTIONS FOR TRANSFORMATIONS ──────────────────────────────

// For species names we want to do the following:
// • Remove the "SPECIES_" prefix.
// • If the remaining string contains an underscore then split it up,
//   converting the first part to “Proper Case” and appending the subsequent
//   part(s) in parentheses.
// Examples:
//   SPECIES_KRABBY            => "Krabby"
//   SPECIES_ZIGZAGOON_GALAR   => "Zigzagoon (Galar)"
//   SPECIES_DEERLING_SPRING   => "Deerling (Spring)"
function properCase(word: string): string {
  // Only change the case if the word is entirely alphabetical.
  if (/^[A-Za-z]+$/.test(word)) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }
  return word
}

function parseSpecies(species: string): string {
  if (!species.startsWith('SPECIES_')) return species
  const withoutPrefix = species.slice('SPECIES_'.length)
  const parts = withoutPrefix.split('_')
  if (parts.length === 1) {
    return properCase(parts[0])
  }
  else {
    const first = properCase(parts[0])
    // Join the remaining parts with a space then wrap them in parentheses.
    const rest = parts.slice(1).map(properCase).join(' ')
    return `${first} (${rest})`
  }
}

// For route names we need to:
// • Remove the "MAP_" prefix.
// • For strings with underscores (e.g. "MAGMA_HIDEOUT_1F") replace the _
//    with a space.
// • For strings without underscores (e.g. "ROUTE101") insert a space
//   between the letters and the digits.
// • Finally, “Proper Case” the alphabetic portions. (For alphanumeric parts
//   like "B1F" we leave them unchanged.)
// Examples:
//   MAP_ROUTE123                  => "Route 123"
//   MAP_MAGMA_HIDEOUT_1F           => "Magma Hideout 1F"
//   MAP_ABANDONED_SHIP_ROOMS_B1F   => "Abandoned Ship Rooms B1F"
function parseRoute(route: string): string {
  if (route.startsWith('MAP_')) {
    route = route.slice(4)
  }
  if (route.indexOf('_') === -1) {
    // Insert a space between letters and digits if not separated by an underscore.
    route = route.replace(/^([A-Z]+)(\d+)$/, '$1 $2')
  }
  else {
    // Replace underscores with a space.
    route = route.replace(/_/g, ' ')
  }
  // Split into words and proper-case any word that is entirely alphabetical.
  const words = route.split(' ')
  return words
    .map((word) => {
      return /^[A-Za-z]+$/.test(word) ? properCase(word) : word
    })
    .join(' ')
}

// ─── ZOD SCHEMAS ──────────────────────────────────────────────

const EncounterMonSchema = z.object({
  min_level: z.number(),
  max_level: z.number(),
  species: z.string().transform(parseSpecies),
})

const EncounterGroupSchema = z.object({
  encounter_rate: z.number(),
  mons: z.array(EncounterMonSchema),
})

const FieldSchema = z.object({
  type: z.enum(['land_mons', 'water_mons', 'rock_smash_mons', 'fishing_mons']),
  encounter_rates: z.array(z.number()),
  groups: z.record(z.array(z.number())).optional(),
})

const EncounterSchema = z.object({
  map: z.string().transform(parseRoute),
  base_label: z.string(),
  land_mons: EncounterGroupSchema.optional(),
  water_mons: EncounterGroupSchema.optional(),
  fishing_mons: EncounterGroupSchema.optional(),
})

export const WildEncounterGroupSchema = z.object({
  label: z.string(),
  for_maps: z.boolean(),
  fields: z.array(FieldSchema),
  encounters: z.array(EncounterSchema),
})

export const WildEncounterDataSchema = z.object({
  wild_encounter_groups: z.array(WildEncounterGroupSchema),
})

// Optionally, you can export a TypeScript interface from the schema:
export type WildEncounterData = z.infer<typeof WildEncounterDataSchema>
