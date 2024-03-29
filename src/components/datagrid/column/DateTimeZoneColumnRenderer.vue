<script setup lang="ts">
import { mdiMinus } from '@mdi/js'
import type { IRow, IColumnSchema, IColumnProp } from 'megio-api/types/collections'
import { ref } from 'vue'

const props = defineProps<{
    value: any
    columnIndex: number
    columnSchema: IColumnProp
    tableSchema: IColumnSchema
    row: IRow
}>()

const value = ref<{
    value: string,
    iso_8601: string,
    zone_id: string,
    utc_offset: string,
}>(props.value)
</script>

<template>
    <span v-if="value" :title="`Zone: ${value.zone_id} | UTC: ${value.utc_offset}`">
        {{ value.iso_8601 }}
    </span>
    <v-icon v-else :icon="mdiMinus" color="grey" size="sm" />
</template>