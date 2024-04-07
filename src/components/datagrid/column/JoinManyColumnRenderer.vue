<script setup lang="ts">
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'
import { mdiMinus } from '@mdi/js'

defineProps<{
    value: { value: string, label: string }[] | null
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}>()
</script>

<template>
    <v-chip-group v-if="Array.isArray(value) && value.length > 0">
        <v-chip
            inline
            density="compact"
            v-for="item in value"
            :key="item.value"
        >{{ item.label }}
        </v-chip>
    </v-chip-group>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>