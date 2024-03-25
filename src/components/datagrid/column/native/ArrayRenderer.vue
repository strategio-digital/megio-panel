<script setup lang="ts">
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'
import { mdiMinus } from '@mdi/js'

defineProps<{
    value: any
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}>()
</script>

<template>
    <VBadge
        v-if="Array.isArray(value)"
        v-for="(item, key) in value"
        :key="key"
        rounded
    >{{ item }}
    </VBadge>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm"/>
</template>