<script setup lang="ts">
import { mdiCheckCircleOutline, mdiMinus } from '@mdi/js'
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
    <div class="text-center">
        <div v-if="value === true || value === false">
            <v-icon :icon="mdiCheckCircleOutline" color="green" v-if="value === true" />
            <v-icon :icon="mdiCheckCircleOutline" color="red" v-if="value === false" />
        </div>
        <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
    </div>
</template>