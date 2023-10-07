<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type { IRow, ISchema, ISchemaProp } from 'megio-api/types/collections'

const props = defineProps<{
    value: any
    columnIndex: number
    columnSchema: ISchemaProp
    tableSchema: ISchema
    row: IRow
}>()

function getResult() {
    const text = Object.values(props.value).join(', ')
    if (text.length > 25) {
        return text.substring(0, 25) + '...'
    }
    return text
}

const result = getResult()

</script>

<template>
    <span v-if="result">{{ result }}</span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm"/>
</template>