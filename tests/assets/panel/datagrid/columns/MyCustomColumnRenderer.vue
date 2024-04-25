<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'

// Dostupné props
defineProps<{
    value: any // Otypovat dle potřeby
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}>()
</script>

<template>
    <a
        class="text-decoration-none"
        v-if="value"
        :href="value"
        target="_blank"
    >
        {{ value }}
    </a>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>