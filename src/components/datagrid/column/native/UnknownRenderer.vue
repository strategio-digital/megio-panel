<script setup lang="ts">
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
    <strong class="text-red">@unknown: {{ columnSchema.renderer }}</strong>
</template>