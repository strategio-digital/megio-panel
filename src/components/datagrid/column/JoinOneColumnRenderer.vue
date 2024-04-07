<script setup lang="ts">
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'
import { mdiMinus } from '@mdi/js'

defineProps<{
    value: { value: string, label: string } | null
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}>()
</script>

<template>
    <v-chip
        v-if="value"
        inline
        density="compact"
        :key="value.value"
    >{{ value.label }}
    </v-chip>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>