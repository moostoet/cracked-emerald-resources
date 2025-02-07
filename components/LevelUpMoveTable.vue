<template>
  <div>
    <UTable :data="placeholderMoves" :columns="columns" class="flex-1" />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import PokemonType from './PokemonType.vue'

const NuxtImg = resolveComponent('NuxtImg')

interface LevelUpMove {
  name: string
  level: number
  basePower?: number
  category: 'physical' | 'special' | 'status'
  type: string
}

const placeholderMoves = ref<LevelUpMove[]>([
  {
    name: 'Water Gun',
    level: 1,
    basePower: 40,
    category: 'special',
    type: 'Water',
  },
  {
    name: 'Tackle',
    level: 4,
    basePower: 40,
    category: 'physical',
    type: 'Normal',
  },
  {
    name: 'Withdraw',
    level: 8,
    basePower: undefined,
    category: 'status',
    type: 'Water',
  },
  {
    name: 'Hydro Cannon',
    level: 12,
    basePower: 40,
    category: 'special',
    type: 'Water',
  },
])

const columns: TableColumn<LevelUpMove[]> = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'level',
    header: 'Level',
  },
  {
    accessorKey: 'basePower',
    header: 'Base Power',
    cell: ({ row }) => `${row.getValue('basePower') === undefined ? '---' : row.getValue('basePower')}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return h(NuxtImg, { src: `/categories/${row.getValue('category')}.png` })
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      return h(PokemonType, { type: row.getValue('type') })
    },
  },
]
</script>

<style>

</style>
