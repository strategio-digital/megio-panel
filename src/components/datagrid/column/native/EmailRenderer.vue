<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'

defineProps<{
    value: any
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
        :href="`mailto:${value}`"
        target="_blank"
    >{{ value }}</a>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>