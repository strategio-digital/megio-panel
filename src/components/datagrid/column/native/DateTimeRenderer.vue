<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import DateHelper from '@/helpers/dateHelper'
import type { IRow, ISchema, ISchemaProp } from 'megio-api/types/collections'
import type { IDateTime } from 'megio-api/types'

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
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>