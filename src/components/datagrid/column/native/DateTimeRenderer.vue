<script setup lang="ts">
import { type IRow } from '@/api/collections/types/IRow'
import { type ISchema } from '@/api/collections/types/ISchema'
import { type ISchemaProp } from '@/api/collections/types/ISchemaProp'
import { type IDateTime } from '@/api/types/IDateTime'
import DateHelper from '@/helpers/dateHelper'

const props = defineProps<{
    value: any
    columnIndex: number
    columnSchema: ISchemaProp
    tableSchema: ISchema
    row: IRow
}>()

function getResult() {
    if (props.value === null) {
        return null
    }

    const dateTime: IDateTime = {
        date: props.value.date,
        timezone: props.value.timezone,
        timezone_type: props.value.timezone
    }

    // TODO: set formatter in PHP entity attribut
    return DateHelper().toCzDateTime(dateTime)
}

const result = getResult()
</script>

<template>
    <span v-if="result">{{ result }}</span>
    <v-icon v-else icon="mdi-minus" color="grey" size="sm"/>
</template>