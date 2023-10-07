<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
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
    <span v-if="value">{{ value }}</span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm"/>
</template>