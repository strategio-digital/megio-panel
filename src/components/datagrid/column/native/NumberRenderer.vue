<script setup lang="ts">
import { type IRow } from '@/api/collections/types/IRow'
import { type ISchema } from '@/api/collections/types/ISchema'
import { type ISchemaProp } from '@/api/collections/types/ISchemaProp'

const props = defineProps<{
    value: any
    columnIndex: number
    columnSchema: ISchemaProp
    tableSchema: ISchema
    row: IRow
}>()

</script>

<template>
    <span v-if="value">{{ value }}</span>
    <v-icon v-else icon="mdi-minus" color="grey" size="sm"/>
</template>