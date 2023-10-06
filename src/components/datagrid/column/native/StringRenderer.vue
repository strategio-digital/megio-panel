<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import { type IRow } from '@/api/collections/types/IRow'
import { type ISchema } from '@/api/collections/types/ISchema'
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
    <span v-if="value">{{ value }}</span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm"/>
</template>