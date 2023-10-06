<script setup lang="ts">
import { type ISchema } from '@/api/collections/types/ISchema'
import { type IRow } from '@/api/collections/types/IRow'
import { type ISchemaProp } from '@/api/collections/types/ISchemaProp'

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