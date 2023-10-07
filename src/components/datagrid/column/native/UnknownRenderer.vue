<script setup lang="ts">
import type { IRow, ISchema, ISchemaProp } from 'megio-api/types/collections'

defineProps<{
    value: any
    columnIndex: number
    columnSchema: ISchemaProp
    tableSchema: ISchema
    row: IRow
}>()
</script>

<template>
    <strong class="text-red">@unknown_column_type: {{ columnSchema.type }}</strong>
</template>